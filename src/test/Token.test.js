const Token = require('../lexer/Token')
const TokenClass = require('../lexer/TokenClass')
const Peek = require('../common/Peek')
const arrayGenerator = require('../common/arrayGenerator')

const {assert} = require('chai')

describe('Test Token', () => {

    function assertToken(token, value, type){
        assert.equal(token.getValue(), value)    
        assert.equal(token.getType(), type)    
    }

    it('test_selectCharType', () => {
        var it_1 = new Peek(arrayGenerator([...'if abc']))
        var it_2 = new Peek(arrayGenerator([...'true 123']))

        var token_1 = Token.selectCharType(it_1)
        var token_2 = Token.selectCharType(it_2)
        // Jump the whitespace between 'f a',
        // render 'a' close to the time window and the next value to be read.
        it_1.next()
        var token_3 = Token.selectCharType(it_1)

        assertToken(token_1, 'if', TokenClass.KEYWORD)
        assertToken(token_2, 'true', TokenClass.BOOLEAN)
        assertToken(token_3, 'abc', TokenClass.VARIABLE)
    })

    it('test_makeString', () => {
        const tests = ["'123'", '"123"']

        for (let test of tests){
            const it = new Peek(arrayGenerator([...test]))
            const token = Token.makeString(it)
            assertToken(token, test, TokenClass.STRING)
        }
    })

    it('test_makeOperator', () => {
        const tests = [
            ['+ abc', '+'],
            ['++xxx', '++'],
            ['/=a', '/='],
            ['==2', '=='],
            ['&=123', '&='],
            ['&123', '&'],
            ['||aa', '||'],
            ['^=123', '^='],
            ['%2', '%'],
        ]

        for (let test of tests){
            const [input, expected] = test
            const it = new Peek(arrayGenerator([...input]))
            const token = Token.makeOperator(it)
            assertToken(token, expected, TokenClass.OPERATOR)
        }
    })

    it('test_makeNumber', () => {
        const tests = [
            '+0 AA',
            '-0 aa',
            '.3 abc',
            '.111 abc',
            '123.123 abc',
            '-123 abc',
            '-123.123*123'
        ]

        for (let test of tests) {
            const it = new Peek(arrayGenerator([...test]))
            const token = Token.makeNumber(it)
            // Use the whitespace or asterisk as a separator, get the sign part.
            const [expected] = test.split(/[ *]/);
            // Ascertain whether there is a dot to determine the data type.
            const type = test.indexOf('.') == -1 ? TokenClass.INTEGER : TokenClass.FLOAT
            assertToken(token, expected, type)
        }
    })
})