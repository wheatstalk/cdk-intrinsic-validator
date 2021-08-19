const timeout = 600000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeEach(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('https://aws.amazon.com/');
    }, timeout);

    it('has training information', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toEqual(expect.stringMatching(/training/i));
    });

    it('clicks to the lambda product page', async() => {
      await page.click('.m-nav a[href^="/products/"]');

      await page.waitForSelector('#m-nav-panel-products.m-active a[data-sidebar="products-compute"]');
      await page.hover('#m-nav-panel-products.m-active a[data-sidebar="products-compute"]')

      await page.waitForSelector('#products-compute.m-active a[href*="/lambda/"]');
      await page.click('#products-compute.m-active a[href*="/lambda/"]');
      
      await page.waitForSelector('h1#AWS_Lambda');
      const h1Text = await page.evaluate(() => document.body.querySelector('h1#AWS_Lambda').textContent);
      expect(h1Text).toEqual(expect.stringMatching(/lambda/i));
    }, timeout);
  },
  timeout,
);
