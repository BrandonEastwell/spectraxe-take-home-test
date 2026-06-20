import {expect, test} from "@playwright/test";

test("page loads and actionable-only filter works", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Live Quote Blotter" })).toBeVisible();
    await expect(page.getByRole("rowheader", { name: "GBP/USD" })).toBeVisible();

    await page.getByRole("button", { name: /show filters/i }).click();
    await page.getByLabel("Actionable Only").check();
    await page.getByRole("button", { name: /apply filters/i }).click();

    await expect(page.getByRole("rowheader", { name: "GBP/USD" })).toBeVisible();
    await expect(page.getByRole("rowheader", { name: "AUD/USD" })).toBeVisible();
    await expect(page.getByRole("rowheader", { name: "USD/JPY" })).toHaveCount(0);
});
