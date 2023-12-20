import { expect, Locator, Page } from "@playwright/test";
const PageUrl = "https://www.scentbird.com/gift?months=6";


export class GiftPage {
  readonly page: Page;
  readonly acceptall: Locator;
  readonly rejectall: Locator;
  readonly manage: Locator;
  readonly consentBanner: Locator;
  readonly cologneItem: Locator;
  readonly perfumeItem: Locator;
  readonly recipientName: Locator;
  readonly recipientEmail: Locator;
  readonly recipientMessage: Locator;
  readonly whoisitfromName: Locator;
  readonly sendNowOption: Locator;
  readonly sendLaterOption: Locator;
  readonly toCartBtn: Locator;
  readonly cart: Locator;
  readonly checkoutBtn: Locator;
  readonly recipientNameErr: Locator;
  readonly recipientEmailErr: Locator;
  readonly giftItem: Locator;
  readonly giftOfferBanner: Locator;


  constructor(page: Page) {
    this.page = page;
    this.consentBanner = page.locator('#ensNotifyBanner');
    this.acceptall = page.locator('#ensAcceptAll'); 
    this.rejectall = page.locator('#ensRejectAll');
    this.manage = page.locator('#ensOpenModal');
    this.cologneItem = page.getByTestId("recipientGenderOptionMale");
    this.perfumeItem = page.getByTestId("recipientGenderOptionFemale");
    this.recipientName = page.getByTestId("recipientName");
    this.recipientEmail = page.getByTestId("recipientEmail");
    this.recipientMessage = page.getByTestId("recipientMessage");
    this.whoisitfromName = page.getByTestId("senderName");
    this.sendNowOption = page.getByTestId("sendDateOptionNow");
    this.sendLaterOption = page.getByTestId("sendDateOptionLater");
    this.toCartBtn = page.getByTestId("checkoutNowButton");
    this.cart = page.getByTestId("cartModal");
    this.checkoutBtn = page.getByTestId("modalPrimaryButton");
    this.recipientNameErr = page.getByTestId("recipientNameError");
    this.recipientEmailErr = page.getByTestId("recipientEmailError");
    this.giftItem = page.getByTestId("orderGiftSubscription");
    this.giftOfferBanner = page.getByTestId("giftSubscriptionOfferBannerItem");
  }

  async navigate() {
    await this.page.goto(PageUrl);
    await expect(this.page).toHaveTitle(
      /The Perfect Gift: Perfume Subscription Starting at/
    );
    await expect(this.consentBanner).toBeVisible();
    await this.acceptall.click();
    await expect(this.consentBanner).toBeHidden();
  }

  async toCart() {
    await this.toCartBtn.click();
  }

  async checkGiftIsInCart() {
    await expect(this.giftItem).toBeVisible();
  }    

  async checkGiftOfferIsInCart() {
    await expect(this.giftOfferBanner).toBeVisible();
  }

  async selectCologneItem() {
    await this.cologneItem.check();
    expect(await this.cologneItem.isChecked()).toBeTruthy();
  }

  async selectPerfumeItem() {
    await this.perfumeItem.check();
    expect(await this.perfumeItem.isChecked()).toBeTruthy();
  }

  async fillRecipientNameField(name: string) {
    await this.recipientName.fill(name);
  }

  async fillRecipientEmailField(email: string) {
    await this.recipientEmail.fill(email);
  }

  async fillMessageField(message: string) {
    await this.recipientMessage.fill(message);
  }


  async fillWhoisitfromNameField(name: string) {
    await this.whoisitfromName.fill(name);
  }

  async selectSendNowOption() {
    await this.sendNowOption.check();
    expect(await this.sendNowOption.isChecked()).toBeTruthy();
  }

  async selectSendLaterOption() {
    await this.sendLaterOption.check();
    expect(await this.sendLaterOption.isChecked()).toBeTruthy();
  }

  async checkCartIsVisible() {
    await expect(this.cart).toBeVisible();
    await expect(this.checkoutBtn).toBeEnabled();
  }

  async toCheckout() {
    await this.checkoutBtn.click();
  }

  async checkRegisterPageRedirect() {
    await expect(this.page).toHaveURL(/.*register/);
  }

  async checkRecipientNameErr() {
    await expect(this.recipientNameErr).toBeVisible();
  }

  async checkRecipientEmailErr() {
    await expect(this.recipientEmailErr).toBeVisible();
  }

}