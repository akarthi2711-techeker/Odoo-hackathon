const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DEPLOY_DIR = path.join(__dirname, 'smartcafe-deploy');
const APPS = [
  { name: 'admin-erp', outDir: 'admin' },
  { name: 'pos-terminal', outDir: 'pos' },
  { name: 'kds-display', outDir: 'kds' },
  { name: 'customer-portal', outDir: 'customer' }
];

console.log('🚀 Starting Unified Build Process...');

// 1. Clean deploy directory
if (fs.existsSync(DEPLOY_DIR)) {
  console.log('🧹 Cleaning old deployment directory...');
  fs.rmSync(DEPLOY_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DEPLOY_DIR);

// 2. Build each app
APPS.forEach(app => {
  console.log(`\n📦 Building ${app.name}...`);
  try {
    execSync(`cd ${app.name} && npm run build`, { stdio: 'inherit' });
    
    // Copy dist to unified folder
    const distPath = path.join(__dirname, app.name, 'dist');
    const targetPath = path.join(DEPLOY_DIR, app.outDir);
    
    // Recursive copy
    fs.cpSync(distPath, targetPath, { recursive: true });
    console.log(`✅ Successfully built and moved ${app.name} to /${app.outDir}`);
  } catch (error) {
    console.error(`❌ Failed to build ${app.name}`, error);
    process.exit(1);
  }
});

// 3. Create Landing Page
console.log('\n🎨 Generating Launchpad Landing Page...');
const landingPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMARTCAFE 360 Launchpad</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 0.5rem;
            background: -webkit-linear-gradient(#f97316, #fcd34d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p {
            font-size: 1.2rem;
            color: #94a3b8;
            margin-bottom: 3rem;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            max-width: 800px;
            width: 90%;
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            text-decoration: none;
            color: white;
            transition: all 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.1);
            border-color: #f97316;
            box-shadow: 0 10px 25px rgba(249, 115, 22, 0.2);
        }
        .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        .desc {
            font-size: 0.9rem;
            color: #cbd5e1;
        }
    </style>
</head>
<body>
    <h1>SMARTCAFE 360</h1>
    <p>AI-Powered Restaurant Operating System</p>
    
    <div class="grid">
        <a href="./admin/index.html" class="card">
            <div class="icon">👨‍💼</div>
            <div class="title">Admin ERP</div>
            <div class="desc">Manage inventory, reports, and AI insights.</div>
        </a>
        <a href="./pos/index.html" class="card">
            <div class="icon">🏪</div>
            <div class="title">POS Terminal</div>
            <div class="desc">Front-of-house ordering and checkout.</div>
        </a>
        <a href="./kds/index.html" class="card">
            <div class="icon">🍳</div>
            <div class="title">Kitchen Display</div>
            <div class="desc">Real-time order Kanban board for chefs.</div>
        </a>
        <a href="./customer/index.html" class="card">
            <div class="icon">📱</div>
            <div class="title">Customer Portal</div>
            <div class="desc">QR code menu and self-ordering platform.</div>
        </a>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(DEPLOY_DIR, 'index.html'), landingPageHTML);

console.log('\n✨ DONE! Your unified build is ready.');
console.log('📁 Navigate to the "smartcafe-deploy" folder and upload its contents to your SINGLE S3 bucket!');
