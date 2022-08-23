let page;

describe("Netology page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content", async () => {
    await page.goto("https://netology.ru/", {waitUntil: 'load', timeout: 0});
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Нетология — обучение современным профессиям онлайн');
  }, 100000);

  test("The first link attribute", async () => {
    await page.goto("https://netology.ru/", {waitUntil: 'load', timeout: 0});
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("/legal/24");
  }, 100000);

  test("The page contains Sign in button", async () => {
    await page.goto("https://netology.ru/", {waitUntil: 'load', timeout: 0});
    const btnSelector = ".src-shared-components-Header--loginLink--aIJO3";
    const actual =  await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Войти")
  }, 100000);
});