import os

docs_dir = r"c:\Users\Admin\OneDrive\Desktop\odoo Hackathon\docs"
os.makedirs(docs_dir, exist_ok=True)

docs = {
    "1_UI_Design_System.md": """# UI Design System
## Aesthetics
- Modern, elegant, minimal
- Glassmorphism, soft shadows, skeleton loaders
- Smooth transitions, hover effects, toast notifications

## Typography
- Inter (Headings/UI)
- Manrope (Body/Data)

## Colors
- Primary: #FF8A00
- Secondary: #FFB347
- Success: #10B981
- Danger: #EF4444
- Warning: #F59E0B
- Dark: #0F172A
- Background: #F8FAFC
- Cards: #FFFFFF

## Frameworks
- Admin ERP: Bootstrap 5 (Slate Minimalist + Tech Steel)
- POS: Tailwind CSS (Espresso & Warm Oat)
- KDS: Bulma (Nordic Mint & High Contrast Cyber)
""",
    "2_Frontend_Structure.md": """# Complete Frontend Structure
```
smartcafe-360-frontend/
├── apps/
│   ├── admin-erp/           # React + Vite + Bootstrap 5
│   ├── pos-terminal/        # React + Vite + Tailwind CSS
│   ├── kds-display/         # React + Vite + Bulma
│   └── customer-portal/     # React + Vite + Tailwind CSS
├── packages/
│   ├── ui-components/       # Shared UI logic
│   └── utils/               # Shared API clients, formatters
└── package.json             # Monorepo config (pnpm workspace or yarn workspaces)
```
""",
    "3_Backend_Structure.md": """# Complete Backend Structure
```
backend/
├── src/
│   ├── controllers/      # Route logic
│   ├── middlewares/      # Auth, Logging, Error Handling
│   ├── models/           # Database schema representations
│   ├── routes/           # API endpoints routing
│   ├── services/         # Business logic, AI, Payments
│   ├── sockets/          # Socket.IO handlers
│   └── index.ts          # Entry point
├── tests/                # Unit and Integration tests
├── package.json
└── tsconfig.json
```
""",
    "4_Folder_Structure.md": """# Overall Folder Structure
```
smartcafe-360/
├── backend/                  # Node.js backend
├── frontend/                 # React frontends (Monorepo)
├── docs/                     # Architectural documents
├── docker-compose.yml        # Local dev environment orchestration
└── README.md
```
""",
    "5_Database_Schema.md": """# Database Schema (MySQL)
**Tables:**
- `users` (id, name, email, password, role_id)
- `roles` (id, name)
- `products` (id, name, price, tax, category_id, status)
- `categories` (id, name, color)
- `floors` (id, name)
- `tables` (id, table_number, seats, status, floor_id, qr_token)
- `customers` (id, name, email, phone)
- `orders` (id, status, subtotal, tax, discount, total, table_id, customer_id, coupon_id)
- `order_items` (id, order_id, product_id, quantity, price)
- `payments` (id, order_id, amount, method, status)
- `coupons` (id, code, type, value, status)
""",
    "6_ER_Diagram.md": """# ER Diagram
```mermaid
erDiagram
    USERS ||--o{ ROLES : has
    USERS ||--o{ ORDERS : processes
    PRODUCTS ||--o{ CATEGORIES : belongs_to
    PRODUCTS ||--o{ ORDER_ITEMS : contains
    FLOORS ||--o{ TABLES : contains
    TABLES ||--o{ ORDERS : hosts
    CUSTOMERS ||--o{ ORDERS : places
    ORDERS ||--o{ ORDER_ITEMS : has
    ORDERS ||--o{ PAYMENTS : receives
```
""",
    "7_API_Documentation.md": """# API Documentation
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/products`
- `GET /api/tables`
- `PATCH /api/tables/:id/status`
- `POST /api/orders`
- `GET /api/orders`
- `POST /api/payments/upi`
""",
    "8_AWS_Architecture_Diagram.md": """# AWS Architecture Diagram
```mermaid
architecture-beta
    group aws(cloud)[AWS Cloud]
    service r53(internet)[Route 53] in aws
    service cf(server)[CloudFront] in aws
    service s3(disk)[S3 Buckets] in aws
    service alb(server)[ALB] in aws
    service ec2(server)[EC2 Auto Scaling] in aws
    service rds(database)[RDS MySQL] in aws
    service bedrock(cloud)[Amazon Bedrock] in aws
    r53:R -- L:cf
    cf:R -- L:s3
    r53:R -- L:alb
    alb:R -- L:ec2
    ec2:R -- L:rds
    ec2:T -- B:bedrock
```
""",
    "9_User_Flow_Diagrams.md": """# User Flow Diagrams
See specific lifecycle documents.
""",
    "10_Order_Lifecycle_Diagram.md": """# Order Lifecycle Diagram
```mermaid
stateDiagram-v2
    Draft --> SentToKitchen
    SentToKitchen --> ToCook
    ToCook --> Preparing
    Preparing --> Completed
    Completed --> Paid
    Paid --> [*]
```
""",
    "11_Table_Lifecycle_Diagram.md": """# Table Lifecycle Diagram
```mermaid
stateDiagram-v2
    Available --> Occupied
    Occupied --> Ordering
    Ordering --> Preparing
    Preparing --> PaymentPending
    PaymentPending --> Available
```
""",
    "12_Kitchen_Workflow.md": """# Kitchen Workflow (KDS)
```mermaid
stateDiagram-v2
    [*] --> ToCook : New Order Received
    ToCook --> Preparing : Chef Started
    Preparing --> Completed : Food Ready
```
""",
    "13_Customer_Ordering_Workflow.md": """# Customer Ordering Workflow
```mermaid
stateDiagram-v2
    [*] --> ScanQR
    ScanQR --> BrowseMenu
    BrowseMenu --> AddItems
    AddItems --> PlaceOrder
    PlaceOrder --> TrackStatus
```
""",
    "14_Socket_IO_Event_Architecture.md": """# Socket.IO Event Architecture
**Events:**
- `order-created` -> Broadcast to KDS
- `kitchen-status-changed` -> Broadcast to POS & Customer
- `payment-started` -> Broadcast to POS & Customer
- `payment-completed` -> Broadcast to POS & Customer
""",
    "15_Deployment_Guide.md": """# Deployment Guide
## Frontend
Deploy built Vite bundles to AWS S3. Use CloudFront for CDN distribution.

## Backend
Deploy Node.js to AWS EC2 using PM2. Nginx as reverse proxy.
Database is RDS MySQL.

## CI/CD
GitHub Actions builds Docker images, runs tests, and pushes to ECR, then updates EC2.
""",
    "16_Production_Ready_Project_Blueprint.md": """# Production Ready Project Blueprint
## Goal
Build SMARTCAFE 360, an AI-powered SaaS for restaurants.
## Stack
- Frontend: React, Vite, Bootstrap/Tailwind/Bulma
- Backend: Node.js, Express, Socket.IO
- DB: MySQL
- AI: Amazon Bedrock
"""
}

for filename, content in docs.items():
    filepath = os.path.join(docs_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully generated all architecture documents.")
