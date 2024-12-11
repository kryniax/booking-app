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

  await page.locator('[name="name"]').fill("TestHotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page.locator('[name="description"]').fill("TestHotelDesc in testCity");
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

  await expect(
    page.getByRole("heading", { name: "TestHotel" }).first()
  ).toBeVisible();
  await expect(
    page.getByText("TestHotelDesc in testCity").first()
  ).toBeVisible();

  await expect(page.getByText("Test City, Test Country").first()).toBeVisible();
  await expect(page.getByText("Romantic").first()).toBeVisible();
  await expect(page.getByText("100").first()).toBeVisible();
  await expect(page.getByText("2 adults, 21 children").first()).toBeVisible();
  await expect(page.getByText("4 Star Rating").first()).toBeVisible();

  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("TestHotel");
  await page.locator('[name="name"]').fill("TestHotel UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await page.goto(`${UI_URL}/my-hotels`);
  await expect(page.getByText("TestHotel Updated")).toBeVisible();

  await page.reload();

  await page.goto(`${UI_URL}/my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();

  await expect(page.locator('[name="name"]')).toHaveValue("TestHotel UPDATED");
  await page.locator('[name="name"]').fill("TestHotel");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Updated")).toBeVisible();
});
