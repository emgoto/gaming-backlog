import { getAppId } from '../steam-util';

describe('getAppId', () => {
  test('should return appID if given one', () => {
    expect(getAppId('12345')).toEqual('12345');
  });

  test('should return appID from Steam string', () => {
    const url = 'https://store.steampowered.com/app/413150/Stardew_Valley/';
    expect(getAppId(url)).toEqual('413150');
  });

  test('should return appID when Steam game contains numbers in it', () => {
    const url = 'https://store.steampowered.com/app/851850/123_DRAGON_BALL_Z_KAKAROT/';
    expect(getAppId(url)).toEqual('851850');
  });

  test('should return undefined when URL is invalid', () => {
    const url = '/foo-bar/yes/123';
    expect(getAppId(url)).toEqual(undefined);
  })
});
