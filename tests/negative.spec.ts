import { test } from "@playwright/test";
import { GiftPage } from "../pages/giftPage";
let giftPage: GiftPage;

test.beforeEach(async ({ page }) => {
  giftPage = new GiftPage(page);
  await giftPage.navigate();
});

test("Check that recipient's name is required field", async () => {
  await giftPage.selectCologneItem();
  await giftPage.fillRecipientEmailField('Test');
  await giftPage.fillWhoisitfromNameField('Test');
  await giftPage.selectSendNowOption();
  await giftPage.toCart();
  await giftPage.checkRecipientNameErr();
})

test("Check that recipient's email is required field", async () => {
  await giftPage.selectPerfumeItem();
  await giftPage.fillRecipientNameField('Test');
  await giftPage.fillWhoisitfromNameField('Test');
  await giftPage.selectSendNowOption();
  await giftPage.toCart();
  await giftPage.checkRecipientEmailErr();
})