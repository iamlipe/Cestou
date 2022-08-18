/* eslint-disable no-undef */

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a logo in login screen', async () => {
    const logo = await element(by.id('logo'));

    await expect(logo).toBeVisible();
  });
});
