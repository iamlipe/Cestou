/* eslint-disable no-undef */

describe('BasketConsumer', () => {
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

    const tabFinancial = await element(by.id('icon-tab-basket'));
    await tabFinancial.tap();
  });

  test('should sign basket producer', async () => {
    const frequencyOption = await element(by.text('Weekly'));
    const sizeOption = await element(by.text('Small'));
    const buttonSubmitPlan = await element(by.id('submit-button-plan'));

    await frequencyOption.tap();
    await sizeOption.tap();

    await element(by.id('basket-signup-plan-consumer-screen')).scrollTo(
      'bottom',
    );

    await buttonSubmitPlan.tap();

    const buttonSubmitFood = await element(by.id('submit-button-food'));

    await element(by.id('basket-signup-food-consumer-screen')).scrollTo(
      'bottom',
    );

    await buttonSubmitFood.tap();

    const buttonConfirmFood = await element(by.id('confirm-button'));

    await buttonConfirmFood.tap();

    const buttonSubmitPayment = await element(by.id('submit-button-payment'));
    const optionDellivery = await element(
      by.text('Pick up at the collection point'),
    );

    await optionDellivery.tap();

    await element(by.id('basket-signup-payment-consumer-screen')).scrollTo(
      'bottom',
    );

    await buttonSubmitPayment.tap();

    await expect(
      element(by.text('Your order has been confirmed and will be prepared!')),
    ).toBeVisible();
  });

  test('should not go to the basket food screen if user dont select frequency and have must appear a error warning', async () => {
    const sizeOption = await element(by.text('Small'));
    const buttonSubmitPlan = await element(by.id('submit-button-plan'));

    await sizeOption.tap();

    await element(by.id('basket-signup-plan-consumer-screen')).scrollTo(
      'bottom',
    );

    await buttonSubmitPlan.tap();

    await expect(
      element(by.id('basket-signup-plan-consumer-screen')),
    ).toBeVisible();
    await expect(element(by.text('Field required'))).toBeVisible();
  });

  test('should not go to the basket food screen if user dont select size and have must appear a error warning', async () => {
    const frequencyOption = await element(by.text('Weekly'));
    const buttonSubmitPlan = await element(by.id('submit-button-plan'));

    await frequencyOption.tap();

    await element(by.id('basket-signup-plan-consumer-screen')).scrollTo(
      'bottom',
    );

    await buttonSubmitPlan.tap();

    await expect(
      element(by.id('basket-signup-plan-consumer-screen')),
    ).toBeVisible();
    await expect(element(by.text('Field required'))).toBeVisible();
  });

  test('should not confirm payment if user dont select type delivery and have must appear a error warning', async () => {
    const frequencyOption = await element(by.text('Weekly'));
    const sizeOption = await element(by.text('Small'));
    const buttonSubmitPlan = await element(by.id('submit-button-plan'));

    await frequencyOption.tap();
    await sizeOption.tap();

    await element(by.id('basket-signup-plan-consumer-screen')).scrollTo(
      'bottom',
    );

    await buttonSubmitPlan.tap();

    const buttonSubmitFood = await element(by.id('submit-button-food'));

    await element(by.id('basket-signup-food-consumer-screen')).scrollTo(
      'bottom',
    );

    await buttonSubmitFood.tap();

    const buttonConfirmFood = await element(by.id('confirm-button'));

    await buttonConfirmFood.tap();

    const buttonSubmitPayment = await element(by.id('submit-button-payment'));

    await element(by.id('basket-signup-payment-consumer-screen')).scrollTo(
      'bottom',
    );

    await buttonSubmitPayment.tap();

    await expect(
      element(by.id('basket-signup-payment-consumer-screen')),
    ).toBeVisible();
    await expect(element(by.text('Field required'))).toBeVisible();
  });
});
