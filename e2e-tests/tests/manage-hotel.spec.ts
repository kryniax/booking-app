import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1111@1.com");
  await page.locator("[name=password]").fill("Qwerty123!");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should allow user to create a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/manage-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the test hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "4");
  await page.getByText("Romantic").click();
  await page.getByLabel("Parking").check();
  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("21");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "parking.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByText("My Hotels")).toBeVisible();
  await expect(page.getByText("Test Hotel in test City")).toBeVisible();

  await expect(page.getByText("Test City, Test")).toBeVisible();
  await expect(page.getByText("Romantic")).toBeVisible();
  await expect(page.getByText("38")).toBeVisible();
  await expect(page.getByText("5 adults, 2 children")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
});
