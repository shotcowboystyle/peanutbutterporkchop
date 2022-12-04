import getLogger from './logger';

describe('logger', () => {
  it('should work', () => {
    const debug = getLogger('Test');

    const logSpy = jest.spyOn(debug, 'log');

    debug.log('hello');

    expect(logSpy).toHaveBeenCalledWith('hello');
  });
});
