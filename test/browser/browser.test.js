const puppeteer = require('puppeteer');
jest.setTimeout(40000)

test('screenshot', async (done) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
    page.on('error', err=> {
      console.log('error happen at the page: ', err);
    });
    page.on('pageerror', pageerr=> {
      console.log('pageerror occurred: ', pageerr);
    })

    await page.screenshot({path: 'screenshot.png',  fullPage: true});
      await browser.close();
      done()  
});

