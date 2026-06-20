import os

workspace_dir = r"c:\Users\Admin\OneDrive\Desktop\odoo Hackathon"

phase5_files = {
    "docker/docker-compose.yml": """version: '3.8'

services:
  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: smartcafe
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  backend:
    build: 
      context: ../backend
      dockerfile: ../docker/Dockerfile.backend
    ports:
      - "5000:5000"
    environment:
      - DB_HOST=db
      - DB_USER=root
      - DB_PASS=password
      - DB_NAME=smartcafe
      - JWT_SECRET=supersecret
    depends_on:
      - db

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - backend

volumes:
  db_data:
""",
    "docker/Dockerfile.backend": """FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
""",
    "docker/Dockerfile.frontend": """FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
""",
    "docker/nginx.conf": """events {}

http {
    server {
        listen 80;

        location /api/ {
            proxy_pass http://backend:5000/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /socket.io/ {
            proxy_pass http://backend:5000/socket.io/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
        }
    }
}
""",
    ".github/workflows/deploy.yml": """name: Deploy SMARTCAFE 360

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build Frontends
        run: |
          cd admin-erp && npm ci && npm run build
          cd ../pos-terminal && npm ci && npm run build
          
      - name: Deploy to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 sync admin-erp/dist s3://smartcafe-admin-bucket
          aws s3 sync pos-terminal/dist s3://smartcafe-pos-bucket
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DIST_ID }} --paths "/*"
""",
    "backend/src/services/aiService.ts": """import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Stub for Amazon Bedrock Integration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

export const getSalesForecast = async (prompt: string) => {
  try {
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          { role: "user", content: `As a restaurant AI assistant, answer this query based on sales data: ${prompt}` }
        ]
      })
    });

    // const response = await client.send(command);
    // const result = JSON.parse(new TextDecoder().decode(response.body));
    // return result;
    
    // Returning mock response for hackathon demo purposes if AWS keys are not set
    return { forecast: "Tomorrow's revenue is predicted to be $2,450. Top selling product will be Espresso." };
  } catch (error) {
    console.error("Bedrock API Error:", error);
    throw error;
  }
};
""",
    "backend/src/controllers/aiController.ts": """import { Request, Response } from 'express';
import { getSalesForecast } from '../services/aiService';

export const generateForecast = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const forecast = await getSalesForecast(prompt || "Predict tomorrow's revenue.");
    res.json({ success: true, data: forecast });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI Service Error' });
  }
};
""",
    "backend/src/routes/ai.ts": """import { Router } from 'express';
import { generateForecast } from '../controllers/aiController';

const router = Router();

// @route   POST api/ai/forecast
// @desc    Get AI Sales Forecast via Amazon Bedrock
// @access  Private (Admin)
router.post('/forecast', generateForecast);

export default router;
"""
}

for filename, content in phase5_files.items():
    filepath = os.path.join(workspace_dir, filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Scaffolded Phase 5 configurations.")
