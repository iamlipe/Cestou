/* eslint-disable no-undef */

describe('ProfileScreen', () => {
  beforeAll(async () => device.launchApp());

  beforeEach(async () => {
    await device.reloadReactNative();

    const logo = await element(by.id('logo'));
    const email = await element(by.id(`input-text-phoneOrEmail`));
    const password = await element(by.id('input-text-password'));
    const button = await element(by.id('submit-button'));

    await new Promise(resolve => setTimeout(resolve, 5000));

    await email.tap();
    await email.typeText('consumertest@email.com');

    await password.tap();
    await password.typeText('Ab123456');

    await logo.tap();
    await button.tap();

    const tabProfile = await element(by.id('icon-tab-donation'));
    await tabProfile.tap();
  });

  test('should appear a modal if user select any NGO to donations your hortcoins', async () => {
    const NGOcard = await element(by.text('NGO Comida na mesa'));

    await NGOcard.tap();

    const incrementCoins = await element(by.id('increment-button'));
    const confirmButton = await element(by.id('confirm-button'));

    await incrementCoins.multiTap(3);

    await confirmButton.tap();

    await expect(element(by.id('confirm-donation-screen'))).toBeVisible();
  });
});
