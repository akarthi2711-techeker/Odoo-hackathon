import os

backend_dir = r"c:\Users\Admin\OneDrive\Desktop\odoo Hackathon\backend"

dirs = [
    "src/config",
    "src/controllers",
    "src/middlewares",
    "src/models",
    "src/routes",
    "src/services",
    "src/sockets",
    "src/utils"
]

for d in dirs:
    os.makedirs(os.path.join(backend_dir, d), exist_ok=True)

files = {
    "tsconfig.json": """{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}""",
    ".env": """PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=smartcafe
JWT_SECRET=supersecretkey
""",
    "src/config/database.ts": """import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'smartcafe',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
""",
    "src/models/index.ts": """import sequelize from '../config/database';
import User from './User';
import Product from './Product';

// Initialize associations here if needed

export { sequelize, User, Product };
""",
    "src/models/User.ts": """import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public role_id!: number;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 2 },
  },
  { sequelize, tableName: 'users' }
);

export default User;
""",
    "src/models/Product.ts": """import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public status!: string;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'active' }
  },
  { sequelize, tableName: 'products' }
);

export default Product;
""",
    "src/index.ts": """import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { sequelize } from './models';
import routes from './routes';
import setupSockets from './sockets';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

setupSockets(io);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database connected & synced');
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('DB Connection Error:', err);
});
""",
    "src/routes/index.ts": """import { Router } from 'express';
const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
""",
    "src/sockets/index.ts": """import { Server, Socket } from 'socket.io';

export default function setupSockets(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
"""
}

for filename, content in files.items():
    filepath = os.path.join(backend_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully generated backend scaffold files.")
