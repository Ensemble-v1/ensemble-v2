# Ensemble Deployment Guide

This guide provides comprehensive instructions for deploying Ensemble to various platforms including Render, Vercel, and other cloud providers.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Render Deployment](#render-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Manual Deployment](#manual-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [SSL/HTTPS Configuration](#ssltls-configuration)
- [Monitoring and Logging](#monitoring-and-logging)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🚀 Overview

Ensemble is a full-stack application with separate frontend and backend components. The deployment process involves:

1. **Frontend**: Next.js application deployed to a static hosting platform
2. **Backend**: Node.js/Express API with OEMER integration
3. **Database**: User data storage (optional, depending on requirements)
4. **Environment Variables**: Secure configuration for both services

## 📋 Prerequisites

Before deployment, ensure you have:

- **GitHub Account**: For hosting your code
- **Render Account**: For deployment (or alternative platform)
- **Clerk Account**: For authentication
- **Domain Name**: Optional, for custom domains
- **SSL Certificate**: For HTTPS in production

## 🚀 Render Deployment

### 1. Prepare Your Repository

```bash
# Add all files to git
git add .

# Commit your changes
git commit -m "Ready for production deployment"

# Push to GitHub
git push origin main
```

### 2. Create Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the backend service:

#### Backend Configuration
- **Name**: `ensemble-backend`
- **Runtime**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Instance Type**: `Free` (for testing) or `Standard` (for production)
- **Health Check**: `/health`

#### Environment Variables
Click "Environment Variables" and add:

```env
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-domain.com
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
PYTHON_PATH=python3
LOG_LEVEL=info
```

### 3. Create Frontend Service

1. Click "New" → "Web Service"
2. Connect the same repository
3. Configure the frontend service:

#### Frontend Configuration
- **Name**: `ensemble-frontend`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Instance Type**: `Free` (for testing) or `Standard` (for production)

#### Environment Variables
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

### 4. Update Service URLs

After both services are created:

1. **Update Backend URL**:
   - Go to backend service settings
   - Update `FRONTEND_URL` to match your frontend domain

2. **Update Frontend URL**:
   - Go to frontend service settings
   - Update `NEXT_PUBLIC_BACKEND_URL` to match your backend domain

### 5. Configure Custom Domains (Optional)

1. **Add Domain to Backend**:
   - In backend service settings, add your custom domain
   - Render will provide DNS instructions

2. **Add Domain to Frontend**:
   - In frontend service settings, add your custom domain
   - Render will provide DNS instructions

### 6. SSL Configuration

Render automatically provides SSL certificates for custom domains. Ensure:

1. DNS is properly configured
2. SSL status shows "Active"
3. HTTPS redirects are enabled

## 🚀 Vercel Deployment

### 1. Frontend Deployment

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Deploy Frontend
```bash
# Login to Vercel
vercel login

# Deploy frontend
vercel

# Configure environment variables during deployment
```

#### Vercel Configuration
- **Framework Preset**: `Next.js`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 2. Backend Deployment

#### Using Render for Backend
Since Vercel doesn't support long-running processes well, use Render for the backend:

1. Follow the Render backend deployment steps above
2. Set `NEXT_PUBLIC_BACKEND_URL` to your Render backend URL

### 3. Environment Variables

#### Vercel Environment Variables
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

#### Render Environment Variables
```env
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-domain.com
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
PYTHON_PATH=python3
```

## 🛠️ Manual Deployment

### 1. Server Setup

#### Ubuntu Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python and pip
sudo apt install python3 python3-pip -y

# Install OEMER
pip3 install oemer

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2
```

### 2. Application Setup

```bash
# Clone repository
git clone https://github.com/your-username/ensemble-v2.git
cd ensemble-v2

# Install dependencies
npm install
cd backend && npm install && cd ..

# Create environment files
cp .env.local.example .env.local
cp backend/.env.example backend/.env

# Edit environment files with your values
```

### 3. Frontend Build

```bash
# Build frontend
npm run build

# Start frontend with PM2
pm2 start npm --name "ensemble-frontend" -- start
```

### 4. Backend Setup

```bash
# Create systemd service for backend
sudo nano /etc/systemd/system/ensemble-backend.service
```

#### Backend Service File
```ini
[Unit]
Description=Ensemble Backend Service
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/home/your-user/ensemble-v2/backend
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3001
Environment=FRONTEND_URL=https://your-domain.com
Environment=CLERK_SECRET_KEY=your_secret_key
Environment=CLERK_PUBLISHABLE_KEY=your_publishable_key
Environment=PYTHON_PATH=python3

[Install]
WantedBy=multi-user.target
```

#### Start Backend Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable ensemble-backend
sudo systemctl start ensemble-backend
```

### 5. Nginx Configuration

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/ensemble
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location /static/ {
        alias /home/your-user/ensemble-v2/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Enable Nginx Site
```bash
sudo ln -s /etc/nginx/sites-available/ensemble /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Environment Configuration

### Frontend (.env.local)

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_publishable_key
CLERK_SECRET_KEY=sk_live_your_secret_key

# Backend URL
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com

# Optional: Custom domain for Clerk
# NEXT_PUBLIC_CLERK_DOMAIN=your-domain.com

# Optional: Theme customization
# NEXT_PUBLIC_THEME=dark
```

### Backend (.env)

```env
# Server Configuration
NODE_ENV=production
PORT=3001

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com

# Clerk Authentication
CLERK_SECRET_KEY=sk_live_your_secret_key
CLERK_PUBLISHABLE_KEY=pk_live_your_publishable_key

# Python Path (for OEMER)
PYTHON_PATH=python3

# Logging
LOG_LEVEL=info

# File Upload Limits
MAX_FILE_SIZE=52428800  # 50MB

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# CORS Origins
CORS_ORIGIN=https://your-frontend-domain.com

# Optional: Database (if needed)
# DATABASE_URL=your_database_url

# Optional: Redis (for caching)
# REDIS_URL=your_redis_url
```

## 🗄️ Database Setup

### PostgreSQL (Optional)

If you need user data persistence:

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database and user
sudo -u postgres createdb ensemble_db
sudo -u postgres createuser ensemble_user
sudo -u postgres psql -c "ALTER USER ensemble_user PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ensemble_db TO ensemble_user;"
```

#### Database Environment Variables
```env
DATABASE_URL=postgresql://ensemble_user:your_password@localhost:5432/ensemble_db
```

### Redis (Optional)

For caching and session management:

```bash
# Install Redis
sudo apt install redis-server -y

# Configure Redis
sudo nano /etc/redis/redis.conf
# Set maxmemory and maxmemory-policy

# Restart Redis
sudo systemctl restart redis-server
```

#### Redis Environment Variables
```env
REDIS_URL=redis://localhost:6379
```

## 🔒 SSL/TLS Configuration

### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### SSL Configuration in Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
}
```

## 📊 Monitoring and Logging

### Application Logging

```bash
# View backend logs
pm2 logs ensemble-backend

# View PM2 status
pm2 status

# View system logs
journalctl -u ensemble-backend -f
```

### Error Tracking

Consider integrating with error tracking services:

- **Sentry**: For error monitoring
- **LogRocket**: For session replay
- **Datadog**: For comprehensive monitoring

### Performance Monitoring

```bash
# Install monitoring tools
npm install -g pm2-web

# Start PM2 web interface
pm2-web
```

## 🐛 Troubleshooting

### Common Deployment Issues

#### 1. OEMER Not Found
```bash
# Check OEMER installation
python3 -c "import oemer; print('OEMER installed')"

# If not installed
pip3 install oemer
```

#### 2. Port Conflicts
```bash
# Check port usage
sudo lsof -i :3000
sudo lsof -i :3001

# Kill processes if needed
sudo kill -9 <PID>
```

#### 3. Environment Variables
```bash
# Check environment variables
echo $NODE_ENV
echo $CLERK_SECRET_KEY

# Verify backend can access env
cd backend && node -e "console.log(process.env.CLERK_SECRET_KEY)"
```

#### 4. Build Failures
```bash
# Clear node modules and rebuild
rm -rf node_modules backend/node_modules
npm install
cd backend && npm install && cd ..
npm run build
```

#### 5. SSL Issues
```bash
# Test SSL configuration
openssl s_client -connect your-domain.com:443

# Check certificate expiration
sudo openssl x509 -enddate -noout -in /etc/letsencrypt/live/your-domain.com/cert.pem
```

### Debug Mode in Production

```bash
# Enable debug logging
export LOG_LEVEL=debug

# Restart services
pm2 restart ensemble-backend
sudo systemctl restart ensemble-backend
```

## 🎯 Best Practices

### Security

1. **Environment Variables**: Never commit sensitive data to git
2. **SSL**: Always use HTTPS in production
3. **Dependencies**: Keep packages updated
4. **Firewall**: Configure UFW or similar
5. **User Input**: Validate and sanitize all inputs

### Performance

1. **Caching**: Implement Redis for session storage
2. **CDN**: Use CDN for static assets
3. **Database**: Optimize queries and use indexes
4. **Compression**: Enable gzip/brotli compression
5. **Monitoring**: Set up alerts for performance issues

### Maintenance

1. **Backups**: Regular database and file backups
2. **Updates**: Regular security updates
3. **Logs**: Monitor and rotate logs
4. **Health Checks**: Implement comprehensive health checks
5. **Documentation**: Keep deployment documentation updated

### Scaling

1. **Load Balancing**: Consider load balancers for high traffic
2. **Database**: Use managed database services
3. **CDN**: Global content delivery
4. **Monitoring**: Set up distributed tracing
5. **Auto-scaling**: Configure auto-scaling based on demand

## 📞 Support

For deployment issues:
- Check the troubleshooting section
- Review logs for error messages
- Consult platform-specific documentation
- Create an issue on GitHub with deployment details

---

**Happy deploying!** 🚀

*Remember: Always test in a staging environment before deploying to production.*
