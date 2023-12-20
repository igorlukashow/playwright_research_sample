import { test } from "@playwright/test";
import { GiftPage } from "../pages/giftPage";
let giftPage: GiftPage;

test.beforeEach(async ({ page }) => {
  giftPage = new GiftPage(page);
  await giftPage.navigate();
});

const userEmail = "igor.lukashow+scentbird@gmail.com";
const userName = "Igor";
const messageText = "Hey guys, how are you?";
const whoisitfromName = "From a secret admirer";

test("Submit the form with required fields only (cologne, send later)", async () => {
  await giftPage.selectCologneItem();
  await giftPage.fillRecipientNameField(userName);
  await giftPage.fillRecipientEmailField(userEmail);
  await giftPage.selectSendLaterOption();
  await giftPage.toCart();
  await giftPage.checkCartIsVisible();
  await giftPage.checkGiftIsInCart();
  await giftPage.checkGiftOfferIsInCart();
  await giftPage.toCheckout();
  await giftPage.checkRegisterPageRedirect();
});

test("Submit the form with all fields (perfume, send right now)", async () => {
  await giftPage.selectPerfumeItem();
  await giftPage.fillRecipientNameField(userName);
  await giftPage.fillRecipientEmailField(userEmail);
  await giftPage.fillMessageField(messageText);
  await giftPage.fillWhoisitfromNameField(whoisitfromName);
  await giftPage.selectSendNowOption();
  await giftPage.toCart();
  await giftPage.checkCartIsVisible();
  await giftPage.checkGiftIsInCart();
  await giftPage.checkGiftOfferIsInCart();
  await giftPage.toCheckout();
  await giftPage.checkRegisterPageRedirect();
});