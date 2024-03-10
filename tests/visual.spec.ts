import { test, expect } from "@playwright/test";


const desktopViewports = [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1536, height: 864 },
    { width: 2560, height: 1440 },
  ];

for (const viewport of desktopViewports) {
    test.use({ viewport });
    test(`Test size w:${viewport.width} h:${viewport.height}`, async ({page}) => {
        await page.goto('https://www.scentbird.com/gift?months=6')
        await expect(page).toHaveScreenshot(
           /* {
            mask: [page.locator("div[id='ddv1-captcha-container']")],
            maskColor: '#FF00FF',
            fullPage: true,
            maxDiffPixelRatio: 0.02,
             }*/
             );
    })
 }    