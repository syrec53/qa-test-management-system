# QAFlow Pro - Complete Deployment & Setup Guide

This guide covers local development setup, containerized deployment using Docker & Nginx, cloud deployment (AWS / DigitalOcean / Vercel), and CI/CD automation setup.

---

## 1. Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps
1. Navigate to the project directory:
   ```bash
   cd C:\Users\syada\.gemini\antigravity-ide\scratch\qa-test-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server (Vite frontend on port `3000`):
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`

4. Run the Express backend API (Port `5000`):
   ```bash
   npm run server
   ```

---

## 2. Docker & Nginx Production Deployment

### Option A: Using Docker Compose (Recommended)
Build and spin up both Frontend (Nginx) and Backend (Node Express) microservices:

```bash
docker-compose up --build -d
```

- **Frontend Application**: `http://localhost:80`
- **Backend REST API**: `http://localhost:5000/api/health`

To stop containers:
```bash
docker-compose down
```

### Option B: Building Docker Image Manually
```bash
# Build production image
docker build -t qaflow-pro:latest .

# Run container on port 80
docker run -d -p 80:80 --name qaflow-app qaflow-pro:latest
```

---

## 3. Cloud Server Deployment (AWS EC2 / DigitalOcean / Linode)

1. Provision a Ubuntu 22.04 LTS VM.
2. Install Docker & Docker Compose:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose
   ```
3. Clone your project code repository to `/var/www/qaflow`.
4. Run `docker-compose up --build -d`.
5. Configure SSL Certificate using Certbot:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 4. Vercel & Netlify Deployment (Frontend Only)

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in root directory.
3. Build Settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

---

## 5. GitHub Actions CI/CD Pipeline Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: QAFlow Automated CI/CD Deployment

on:
  push:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - name: Build Docker Container
        run: docker build -t qaflow-app .
```
