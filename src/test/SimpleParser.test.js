const SimpleParser = require('../parser/SimpleParser')
const Lexer = require('../lexer/Lexer')
const arrayGenerator =require('../common/arrayGenerator')
const PeekToken = require('../parser/utility/PeekToken')
const {assert} = require('chai')

describe('Test SimpleParser', () => {
    it('test_basic', () => {
        /* 
        * Each time deal with an expression recursively by regarding the
        * left hand side of the '+' as the scalar 'i', meanwhile, the
        * right hand side as the recursive 'Expression'.
        * Take the following expression '1+2+3+4' as an example:
        * foremost, 1 + (2+3+4), corresponding to i + Expression, etc. 
        * 
        *  expr       +
        *           /   \
        *  v1      1     +            e2
        *              /   \
        *  v2         2     +         e3
        *                 /   \
        *  v3            3     4      v4
        */
        const source = '1+2+3+4'
        const lexer = new Lexer()
        const tokens = lexer.analyse(arrayGenerator([...source]))
        const tokenIt = new PeekToken(arrayGenerator(tokens))
        const expr = SimpleParser.parse(tokenIt)

        assert.equal(expr.children.length, 2)

        assert.equal(expr.lexeme.getValue(), '+')
        const v1 = expr.getChild(0)
        const e2 = expr.getChild(1)
        assert.equal(v1.lexeme.getValue(), '1')
        assert.equal(e2.lexeme.getValue(), '+')
        const v2 = e2.getChild(0)
        const e3 = e2.getChild(1)
        assert.equal(v2.lexeme.getValue(), '2')
        assert.equal(e3.lexeme.getValue(), '+')
        const v3 = e3.getChild(0)
        const v4 = e3.getChild(1)
        assert.equal(v3.lexeme.getValue(), '3')
        assert.equal(v4.lexeme.getValue(), '4')

        expr.print()
    }) 
})