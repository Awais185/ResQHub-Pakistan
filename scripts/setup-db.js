const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
if (!fs.existsSync(dbPath)) {
  console.log('🗄️  First run — initializing database...');
  try {
    execSync('npx prisma db push', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    execSync('npx tsx prisma/seed.ts', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  } catch (e) {
    console.error('Database setup failed:', e.message);
    process.exit(1);
  }
}
