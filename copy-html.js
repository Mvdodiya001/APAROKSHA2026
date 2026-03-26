import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const distDir = path.join(__dirname, 'dist');
const indexHtml = path.join(distDir, 'index.html');

// Read the index.html file
const content = fs.readFileSync(indexHtml, 'utf-8');

// Routes to generate separate HTML files for
const routes = ['admin', 'brochure', 'download'];

// Copy index.html to each route
routes.forEach(route => {
  const filePath = path.join(distDir, `${route}.html`);
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created ${route}.html`);
});

console.log('All route HTML files generated!');
