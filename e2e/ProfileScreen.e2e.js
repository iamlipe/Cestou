/* eslint-disable no-undef */

describe('LoginScreen', () => {
  beforeAll(async () => device.launchApp());

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('should appear name user in producer screen', async () => {
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

    const tabProfile = await element(by.id('icon-tab-profile'));
    await tabProfile.tap();

    await expect(element(by.text('producer'))).toBeVisible();
  });

  test('should logout when signin with an account producer', async () => {
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

    const tabProfile = await element(by.id('icon-tab-profile'));
    await tabProfile.tap();

    await expect(element(by.text('producer'))).toBeVisible();

    const buttonLogout = await element(by.id('logout-button'));

    await buttonLogout.tap();

    await expect(element(by.id('login-screen'))).toBeVisible();
  });

  test('should appear name user in consumer screen', async () => {
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

    const tabProfile = await element(by.id('icon-tab-profile'));
    await tabProfile.tap();

    await expect(element(by.text('consumer'))).toBeVisible();
  });

  test('should logout when signin with an account consumer', async () => {
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

    const tabProfile = await element(by.id('icon-tab-profile'));
    await tabProfile.tap();

    const buttonLogout = await element(by.id('logout-button'));

    await buttonLogout.tap();

    await expect(element(by.id('login-screen'))).toBeVisible();
  });
});
