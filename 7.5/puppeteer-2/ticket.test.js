const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Positive tests", () => {
  test("Booking one seat", async () => {
    await clickElement(page, "body > nav > a:nth-child(2)");
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(2) > a"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(7) > span:nth-child(4)",
      { force: true }
    );
    await clickElement(page, "body > main > section > button");
    const actual = await getText(page, "body > main > section > div > button");
    await expect(actual).toContain("Получить код бронирования");
  });

  test("Booking two seats", async () => {
    await clickElement(page, "body > nav > a:nth-child(3)");
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(4)",
      { force: true }
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(5)",
      { force: true }
    );
    await clickElement(page, "body > main > section > button");
    await page.waitForNavigation();
    const actual = await getText(page, "body > main > section > div > button");
    await expect(actual).toContain("Получить код бронирования");
  });
});

test("Negative test: Button should be disabled when seats cannot be selected", async () => {
  await clickElement(page, "body > nav > a:nth-child(4)");
  await clickElement(
    page,
    "body > main > section:nth-child(3) > div.movie-seances__hall > ul > li > a"
  );
  await page.waitForNavigation();
  await clickElement(
    page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(6)",
    { force: true }
  );
  const buttonSelector = "body > main > section > button";
  const buttonElement = await page.$(buttonSelector);
  const isButtonDisabled = await buttonElement.evaluate(
    (button) => button.disabled
  );
  expect(isButtonDisabled).toBe(true);
});
