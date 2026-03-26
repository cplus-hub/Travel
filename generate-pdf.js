/**
 * PDF Generator for Hugo Site using Puppeteer
 * 
 * Prerequisites:
 * 1. Run `npm install puppeteer` to install the required library.
 * 2. Ensure your Hugo server is running locally (usually at http://localhost:1313).
 *    Command: `hugo server`
 * 
 * Usage:
 * Run this script using Node.js:
 * `node generate-pdf.js`
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  let browser;
  try {
    console.log('Launching headless browser...');
    // Launch the browser
    browser = await puppeteer.launch({
      headless: "new" // Use new headless mode for better performance
    });
    const page = await browser.newPage();
    const baseUrl = 'http://localhost:1313';
    const outputDir = path.join(__dirname, 'static', 'pdf');

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      console.log(`Creating directory: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 定義要轉換的頁面清單
    const pagesToConvert = [
      { path: '20260513_Okinawa/Day1/', filename: '20260513_Okinawa_Day1.pdf' },
      { path: '20260513_Okinawa/Day2/', filename: '20260514_Okinawa_Day2.pdf' },
      { path: '20260513_Okinawa/Day3/', filename: '20260515_Okinawa_Day3.pdf' },
      { path: '20260513_Okinawa/Day4/', filename: '20260516_Okinawa_Day4.pdf' },
      { path: '20260513_Okinawa/Day5/', filename: '20260517_Okinawa_Day5.pdf' },
    ];

    for (const item of pagesToConvert) {
      const targetUrl = `${baseUrl}/Travel/${item.path}`;
      const outputPath = path.join(outputDir, item.filename);

      console.log(`Navigating to ${targetUrl}...`);
      try {
        await page.goto(targetUrl, { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });

        console.log(`Generating PDF for ${item.path}...`);
        await page.pdf({
          path: outputPath,
          format: 'A4',
          printBackground: true,
          margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
        });
        console.log(`✅ Generated: ${item.filename}`);
      } catch (e) {
        console.error(`❌ Failed to generate ${item.filename}:`, e.message);
      }
    }
    
    console.log('🎉 All PDFs generated successfully!');

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
}

// Execute the function
generatePDF();