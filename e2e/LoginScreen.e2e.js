/* eslint-disable no-undef */

const consumer = {
  name: 'consumer',
  email: 'consumertest@email.com',
  password: 'Ab123456',
};

const producer = {
  name: 'producer',
  email: 'producertest@email.com',
  password: 'Ab123456',
};

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
    await email.typeText(consumer.email);

    await password.tap();
    await password.typeText(consumer.password);

    await logo.tap();
    await button.tap();

    await expect(element(by.id('home-consumer-screen'))).toBeVisible();
    await expect(element(by.text(`Olá ${consumer.name}!`))).toBeVisible();
  });

  test('should to make a login with an account producer', async () => {
    const logo = await element(by.id('logo'));
    const email = await element(by.id(`input-text-phoneOrEmail`));
    const password = await element(by.id('input-text-password'));
    const button = await element(by.id('submit-button'));

    await new Promise(resolve => setTimeout(resolve, 5000));

    await email.tap();
    await email.typeText(producer.email);

    await password.tap();
    await password.typeText(producer.password);

    await logo.tap();
    await button.tap();

    await expect(element(by.id('home-producer-screen'))).toBeVisible();
    await expect(element(by.text(`Olá ${producer.name}!`))).toBeVisible();
  });

  test('should go to the register screen', async () => {
    const button = await element(by.id('register-button'));

    await new Promise(resolve => setTimeout(resolve, 5000));

    await button.tap();

    await expect(element(by.id('register-screen'))).toBeVisible();
  });
});
