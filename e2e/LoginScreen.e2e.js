/* eslint-disable no-undef */

describe('LoginScreen', () => {
  beforeAll(async () => device.launchApp());

  beforeEach(async () => device.reloadReactNative());

  test('should to make a login with an account consumer', async () => {
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

    await expect(element(by.id('home-consumer-screen'))).toBeVisible();
    await expect(element(by.text(`Welcome consumer!`))).toBeVisible();
  });

  test('should to make a login with an account producer', async () => {
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

    await expect(element(by.id('home-producer-screen'))).toBeVisible();
    await expect(element(by.text(`Welcome producer!`))).toBeVisible();
  });

  test('should go to the register screen', async () => {
    const button = await element(by.id('register-button'));

    await new Promise(resolve => setTimeout(resolve, 5000));

    await button.tap();

    await expect(element(by.id('register-screen'))).toBeVisible();
  });
});
