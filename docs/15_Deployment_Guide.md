# Deployment Guide
## Frontend
Deploy built Vite bundles to AWS S3. Use CloudFront for CDN distribution.

## Backend
Deploy Node.js to AWS EC2 using PM2. Nginx as reverse proxy.
Database is RDS MySQL.

## CI/CD
GitHub Actions builds Docker images, runs tests, and pushes to ECR, then updates EC2.
