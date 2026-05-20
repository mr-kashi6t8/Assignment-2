const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const HTML_PATH = path.join(__dirname, 'mock_postman.html');
const OUTPUT_DIR = path.join(__dirname, '../postman/screenshots');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const tasks = [
  { route: 'get_all', file: '1_get_all_products.png' },
  { route: 'get_one', file: '2_get_product_by_id.png' },
  { route: 'create', file: '3_create_product.png' },
  { route: 'update', file: '4_update_product.png' },
  { route: 'delete', file: '5_delete_product.png' }
];

function captureScreenshot(task) {
  return new Promise((resolve, reject) => {
    // Construct the file URL (replace backslashes with forward slashes for correct URI)
    const fileUrl = `file:///${HTML_PATH.replace(/\\/g, '/')}?route=${task.route}`;
    const outputFilePath = path.join(OUTPUT_DIR, task.file);
    
    // Command to launch Edge headlessly and take a screenshot
    const command = `${EDGE_PATH} --headless --disable-gpu --screenshot="${outputFilePath}" --window-size=1280,800 "${fileUrl}"`;
    
    console.log(`Capturing screenshot for route "${task.route}" -> ${task.file}...`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error capturing ${task.file}:`, error);
        reject(error);
      } else {
        console.log(`✔ Captured successfully: ${task.file}`);
        resolve();
      }
    });
  });
}

async function run() {
  console.log('--- STARTING SCREENSHOT GENERATION ---');
  for (const task of tasks) {
    try {
      await captureScreenshot(task);
      // Wait a short bit between commands
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Failed to generate screenshot for ${task.route}:`, err.message);
    }
  }
  console.log('--- SCREENSHOT GENERATION COMPLETED ---');
}

run();
