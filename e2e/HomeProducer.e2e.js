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
  });

  test('should appear a modal when user try sign small basket', async () => {
    const buttonMyBasket = await element(by.id('my-basket-button'));

    await buttonMyBasket.tap();

    const smallOption = await element(by.text('Small'));
    const submitButton = await element(by.id('subimit-button'));

    await smallOption.tap();
    await submitButton.tap();

    await expect(
      element(
        by.text(
          'You have added the baskets to your list of supplied products.',
        ),
      ),
    ).toBeVisible();
  });

  test('should back to home producer screen when user confirm sign basket', async () => {
    const buttonMyBasket = await element(by.id('my-basket-button'));

    await buttonMyBasket.tap();

    const smallOption = await element(by.text('Small'));
    const submitButton = await element(by.id('subimit-button'));

    await smallOption.tap();
    await submitButton.tap();

    const confirmButton = await element(by.id('confirm-button'));

    await confirmButton.tap();

    await expect(element(by.id('home-producer-screen'))).toBeVisible();
  });

  test('should disappear modal when user cancel sign basket', async () => {
    const buttonMyBasket = await element(by.id('my-basket-button'));

    await buttonMyBasket.tap();

    const smallOption = await element(by.text('Small'));
    const submitButton = await element(by.id('subimit-button'));

    await smallOption.tap();
    await submitButton.tap();

    const cancelButton = await element(by.id('cancel-button'));

    await cancelButton.tap();

    await expect(element(by.id('subimit-button'))).toBeVisible();
  });

  test('should appear a error when user try press the submit button without select a basket', async () => {
    const buttonMyBasket = await element(by.id('my-basket-button'));

    await buttonMyBasket.tap();

    const submitButton = await element(by.id('subimit-button'));

    await submitButton.tap();

    await expect(element(by.text('Field required'))).toBeVisible();
  });
});
