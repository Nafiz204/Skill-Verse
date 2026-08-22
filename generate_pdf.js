const { chromium } = require('@playwright/test');
const path = require('path');

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.resolve(__dirname, 'testing_cheat_sheet.html');
  await page.goto(`file://${htmlPath}`);
  
  const pdfPath = path.resolve(__dirname, 'Presentastion', 'Skill_Verse_Testing_Guide.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      bottom: '15mm',
      left: '15mm',
      right: '15mm'
    }
  });

  await browser.close();
  console.log(`PDF successfully generated at: ${pdfPath}`);
}

generatePDF().catch(err => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
