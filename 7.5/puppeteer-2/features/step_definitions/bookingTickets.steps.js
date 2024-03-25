const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("the user is on the homepage", async function () {
  await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    timeout: 20000,
  });
});

When("the user selects the day of the movie", async function () {
  await clickElement(this.page, "body > nav > a:nth-child(2)");
});

When("the user selects movie time", async function () {
  await clickElement(
    this.page,
    "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(2) > a"
  );
});

When("the user selects one available seat", async function () {
  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(7) > span:nth-child(4)",
    { force: true }
  );
});

When("the user selects the first available seat", async function () {
  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(4)",
    { force: true }
  );
});

When("the user selects the second available seat", async function () {
  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(5)",
    { force: true }
  );
});

When("the user clicks the booking button", async function () {
  await clickElement(this.page, "body > main > section > button");
});

Then(
  "the user should see the confirmation message {string}",
  async function (expectedMessage) {
    const actualMessage = await getText(
      this.page,
      "body > main > section > div > button"
    );
    expect(actualMessage).to.contain(expectedMessage);
  }
);
