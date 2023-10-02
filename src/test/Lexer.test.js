const Token = require('../lexer/Token')
const TokenClass = require('../lexer/TokenClass')
const Lexer = require('../lexer/Lexer')
const arrayGenerator = require('../common/arrayGenerator')

const {assert} = require('chai')

function assertToken(token, value, type){
    assert.equal(token.getValue(), value)    
    assert.equal(token.getType(), type)    
}

describe('Test Lexer', () => {

    // Read a string and analyse each token.
    it('test_lexer', () => {
        const str = '(a+b)^1.23==+1-23'
        const lexer = new Lexer()
        const tokens = lexer.analyse(arrayGenerator([...str]))

        assert.equal(tokens.length, 11)

        assertToken(tokens[0], '(', TokenClass.BRACKET)
        assertToken(tokens[1], 'a', TokenClass.VARIABLE)
        assertToken(tokens[2], '+', TokenClass.OPERATOR)
        assertToken(tokens[3], 'b', TokenClass.VARIABLE)
        assertToken(tokens[4], ')', TokenClass.BRACKET)
        assertToken(tokens[5], '^', TokenClass.OPERATOR)
        assertToken(tokens[6], '1.23', TokenClass.FLOAT)
        assertToken(tokens[7], '==', TokenClass.OPERATOR)
        assertToken(tokens[8], '+1', TokenClass.INTEGER)
        assertToken(tokens[9], '-', TokenClass.OPERATOR)
        assertToken(tokens[10], '23', TokenClass.INTEGER)
    })

    // Read a function and analyse each token.
    it('test_function', () => { 
        const str = `
            func sample(a, b){
                print(a - b)
            }
            sample(-123.0, 123)
        `

        const lexer = new Lexer()
        const tokens = lexer.analyse(arrayGenerator([...str]))
        assertToken(tokens[0], 'func', TokenClass.KEYWORD)
        assertToken(tokens[1], 'sample', TokenClass.VARIABLE)
        assertToken(tokens[2], '(', TokenClass.BRACKET)
        assertToken(tokens[3], 'a', TokenClass.VARIABLE)
        assertToken(tokens[4], ',', TokenClass.OPERATOR)
        assertToken(tokens[5], 'b', TokenClass.VARIABLE)
        assertToken(tokens[6], ')', TokenClass.BRACKET)
        assertToken(tokens[7], '{', TokenClass.BRACKET)
        assertToken(tokens[8], 'print', TokenClass.VARIABLE)
        assertToken(tokens[9], '(', TokenClass.BRACKET)
        assertToken(tokens[10], 'a', TokenClass.VARIABLE)
        assertToken(tokens[11], '-', TokenClass.OPERATOR)
        assertToken(tokens[12], 'b', TokenClass.VARIABLE)
        assertToken(tokens[13], ')', TokenClass.BRACKET)
        assertToken(tokens[14], '}', TokenClass.BRACKET)
        assertToken(tokens[15], 'sample', TokenClass.VARIABLE)
        assertToken(tokens[16], '(', TokenClass.BRACKET)
        assertToken(tokens[17], '-123.0', TokenClass.FLOAT)
        assertToken(tokens[18], ',', TokenClass.OPERATOR)
        assertToken(tokens[19], '123', TokenClass.INTEGER)
        assertToken(tokens[20], ')', TokenClass.BRACKET)
    })

    // Read a sentence with some annotation, analyse each block and get the final tokens. 
    it('test_annotation', () => {
        const lexer = new Lexer()
        const str = '/*1111\n2222*/a=123'
        const tokens = lexer.analyse(arrayGenerator([...str]))
        // Elements in the tokens should be 'a', '=', '123'.
        assert.equal(tokens.length, 3)
    })
})


