const CharType = require('../lexer/CharType')

const {assert} = require('chai')

describe('Test CharType', () => {

    // Analyse four token types using particular characters, respectively.
    it('test_char', () => {
        assert.equal(true, CharType.isLetter('a'))
        assert.equal(true, CharType.isLetter('B'))
        assert.equal(false, CharType.isLetter('1'))
        assert.equal(true, CharType.isNumber('1'))
        assert.equal(false, CharType.isNumber('a'))
        assert.equal(true, CharType.isLiteral('a'))
        assert.equal(true, CharType.isLiteral('_'))
        assert.equal(true, CharType.isLiteral('0'))
        assert.equal(true, CharType.isOperator('+'))
        assert.equal(true, CharType.isOperator('&'))
        assert.equal(true, CharType.isOperator('*'))
        assert.equal(true, CharType.isOperator('/'))
    })
})