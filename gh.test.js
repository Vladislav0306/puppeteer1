let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  }, 30000);

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 30000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 30000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 30000);
});

describe("Titles of other pages", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  test("Should find the title on /features", async () => {
    await page.goto("https://github.com/features");
    const title = "div.application-main main div.p-responsive.container-xl.text-center.mt-12.mb-6 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The tools you need to build what you want.");
  }, 30000);

  test("Should find the Contact sales button on /features/security", async () => {
    await page.goto("https://github.com/features/security");
    const button = "div.position-relative.z-1.container-xl.mx-auto.px-3.pt-6.py-md-12.height-full.d-flex.flex-column.flex-justify-center";
    const actualButton = await page.$eval(button, (link) => link.textContent);
    expect(actualButton).toContain("Contact sales");
  }, 30000);

  test("Should find the title on /enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = " div.col-9-max.position-relative.z-2.ml-lg-4.ml-xl-0 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("Build like the best");
  }, 30000);
});