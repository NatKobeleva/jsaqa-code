let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  }, 3000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 3000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 3000);
});

describe("Marketplace page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/marketplace");
  });

  test("The title content", async () => {
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toEqual(
      "GitHub Marketplace · to improve your workflow · GitHub"
    );
  });

  test("The text of the first button", async () => {
    const buttonText = await page.$eval("button", (button) =>
      button.textContent.trim()
    );
    expect(buttonText).toEqual("Toggle navigation");
  }, 3000);
});

test("The title content on main page", async () => {
  await page.goto("https://github.com");
  await page.waitForSelector("h1");
  const title = await page.title();
  expect(title).toEqual("GitHub: Let’s build from here · GitHub");
});
