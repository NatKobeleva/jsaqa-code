const { test, expect } = require("@playwright/test");
const testData = require("./user");

test("Successful authorization", async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto("https://netology.ru/");
  // Click text=Войти
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/?modal=sign_in' }*/),
    page.click("text=Войти"),
  ]);
  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', testData.email);
  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', testData.password);
  // Click [data-testid="login-submit-btn"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile/7922119' }*/),
    page.click('[data-testid="login-submit-btn"]'),
  ]);

  const title = page.locator(
    ".src-components-pages-Profile-Programs--title--Kw5NH"
  );
  await expect(title).toHaveText("Моё обучение");
});

test("Authorisation Error", async ({ page }) => {
  // Go to https://netology.ru/
  await page.goto("https://netology.ru/");
  // Click text=Войти
  await page.screenshot({ path: "screenshot1.png" });
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/?modal=sign_in' }*/),
    page.click("text=Войти"),
  ]);
  // Click [placeholder="Email"]
  await page.screenshot({ path: "screenshot2.png" });
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', testData.email);
  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', "123456");
  // Click [data-testid="login-submit-btn"]
  await page.screenshot({ path: "screenshot3.png" });

  await page.click('[data-testid="login-submit-btn"]');

  await page.screenshot({ path: "screenshot4.png" });

  const errorHint = page.locator('[data-testid="login-error-hint"]');
  await expect(errorHint).toHaveText("Вы ввели неправильно логин или пароль");
});
