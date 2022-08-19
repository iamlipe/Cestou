/* eslint-disable no-undef */

describe('LoginScreen', () => {
  beforeAll(async () => device.launchApp());

  beforeEach(async () => {
    await device.reloadReactNative();

    const logo = await element(by.id('logo'));
    const email = await element(by.id(`input-text-phoneOrEmail`));
    const password = await element(by.id('input-text-password'));
    const button = await element(by.id('submit-button'));

    await new Promise(resolve => setTimeout(resolve, 5000));

    await email.tap();
    await email.typeText('producertest@email.com');

    await password.tap();
    await password.typeText('Ab123456');

    await logo.tap();
    await button.tap();

    const tabFinancial = await element(by.id('icon-tab-financial'));
    await tabFinancial.tap();
  });

  test('should go to the screen register pix producer', async () => {
    const button = await element(by.text('Configure pix key'));

    await button.tap();

    const screen = await element(by.text('Pix keys'));
    const phoneOption = await element(by.text('Phone'));
    const inputKey = await element(by.id('input-text-pixValue'));
    const submitButton = await element(by.id('submit-button'));

    await phoneOption.tap();
    await inputKey.typeText('111111111111');

    await screen.tap();

    await submitButton.tap();

    await expect(
      element(by.text('Your PIX key has been successfully registered!')),
    ).toBeVisible();
  });

  test('should appear a error when user try to register a pix key without select a type', async () => {
    const button = await element(by.text('Configure pix key'));

    await button.tap();

    const screen = await element(by.text('Pix keys'));
    const inputKey = await element(by.id('input-text-pixValue'));
    const submitButton = await element(by.id('submit-button'));

    await inputKey.typeText('o1ps10321lmp23');

    await screen.tap();

    await submitButton.tap();

    await expect(element(by.text('Field required'))).toBeVisible();
  });

  test('should appear a error when user try to register a pix key whitout value', async () => {
    const button = await element(by.text('Configure pix key'));

    await button.tap();

    const screen = await element(by.text('Pix keys'));
    const phoneOption = await element(by.text('Phone'));
    const submitButton = await element(by.id('submit-button'));

    await phoneOption.tap();

    await screen.tap();

    await submitButton.tap();

    await expect(element(by.text('Field required'))).toBeVisible();
  });
});
