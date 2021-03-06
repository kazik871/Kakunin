import { create } from './matchers';

const chai = require('chai');
const expect = chai.expect;

const matchers = create();

describe('Matchers', () => {
  it('throws an error when no matcher was found', () => {
    const mockedElement = {};

    expect(() => matchers.match(mockedElement, 'incorrect:unknown-matcher'))
      .to.throw('Could not find matcher for incorrect:unknown-matcher.');
  });

  it('returns true when found a matcher and element value is correct', (done) => {
    const mockedElement = {
      getText: () => Promise.resolve('my message')
    };

    matchers.match(mockedElement, 't:message').then((result) => {
      expect(result).to.equals(true);
      done();
    });
  });

  it('returns false when found a matcher and element value is not correct', (done) => {
    const mockedElement = {
      getText: () => Promise.resolve('my message')
    };

    matchers.match(mockedElement, 't:not-existing').then((result) => {
      expect(result).to.equals(false);
      done();
    });
  });
});
