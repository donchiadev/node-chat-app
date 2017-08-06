const expect = require('expect');

const {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        expect(isRealString({})).toBe(false);
    })
    it('should reject string with only spaces', () => {
        expect(isRealString('  ')).toBe(false);
    });
    it('should allow string with not only non-space characters', () => {
        expect(isRealString('valid string')).toBe(true);
    });
})