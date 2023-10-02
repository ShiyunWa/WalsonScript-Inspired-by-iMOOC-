const Lexer = require('../lexer/Lexer')
const PeekToken = require('../parser/utility/PeekToken')
const arrayGenerator = require('../common/arrayGenerator')
const ParserUtil = require('../parser/utility/ParserUtil')
const Expression = require('../parser/ast/Expression')
const {assert} = require('chai')

function createExpr(str){
    const gen = arrayGenerator([...str])
    const lexer = new Lexer()
    const tokens = lexer.analyse(gen)
    const it = new PeekToken(arrayGenerator(tokens))
    return Expression.parse(it)
}

describe('Test ParseExpression', () => {
    it('test_simple', () => {
        const expr = createExpr('1+2+3')
        assert.equal(ParserUtil.toSuffixExpression(expr), '1 2 3 + +')
    })

    it('test_simple_1', () => {
        const expr = createExpr('"1" == ""')
        assert.equal(ParserUtil.toSuffixExpression(expr), '"1" "" ==')
    })

    it('test_complex', () => {
        const expr = createExpr('0+1*2')
        const expr_2 = createExpr('0*1+2')
        const expr_3 = createExpr('1 * (2+3)')
        const expr_4 = createExpr('(1*2!=8==3!=5*4+6')
        expr_4.print()
        assert.equal(ParserUtil.toSuffixExpression(expr_1), '0 1 2 * +')
        assert.equal(ParserUtil.toSuffixExpression(expr_2), '0 1 * 2 +')
        assert.equal(ParserUtil.toSuffixExpression(expr_3), '1 2 3 + *')
        assert.equal(ParserUtil.toSuffixExpression(expr_4), '1 2 * 8 != 3 5 4 * 6 + != ==')
    })
})