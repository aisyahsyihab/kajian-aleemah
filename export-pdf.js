const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to match slide dimensions
  await page.setViewport({ width: 1280, height: 720 });
  
  // Navigate to the print-pdf version
  await page.goto('http://localhost:8889/index.html?print-pdf', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  // Wait for Reveal.js to initialize using setTimeout
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate PDF
  await page.pdf({
    path: 'kajian-aleemah.pdf',
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  
  console.log('PDF created successfully!');
  await browser.close();
})();
