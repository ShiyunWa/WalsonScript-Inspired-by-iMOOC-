const Lexer = require('../lexer/Lexer')
const PeekToken = require('../parser/utility/PeekToken')
const ParserUtil = require('../parser/utility/ParserUtil')
const arrayGenerator = require('../common/arrayGenerator')

const {assert} = require('chai')
const {AssignState, DeclareState, IfState} = require('../parser/ast/index')

function createToken(src){
    const lexer = new Lexer()
    const tokens = lexer.analyse(arrayGenerator([...src]))
    const tokenIt = new PeekToken(arrayGenerator(tokens))
    return tokenIt
}

describe('Test Statements', () => {
    it('test_assign', () => {
        const it = createToken('i = 123 * 4')
        const state = AssignState.parse(it)
        assert.equal('i 123 4 * =', ParserUtil.toSuffixExpression(state))
    })

    it('test_declare', () => {
        const it = createToken('var i = 123 * 4')
        const state = DeclareState.parse(it)
        assert.equal('i 123 4 * =', ParserUtil.toSuffixExpression(state))
    })

    it('test_ifstate', () => {
        const it = createToken(`if(a){
            var a = 0
        }`)
        const state = IfState.parse(it)
        const expr = state.getExpr()
        const block = state.getBlock()
        const assignState = block.getChild(0)
        const elseBlock = state.getChild(2)

        assert.equal(expr.getLexeme().getValue(), 'a')
        assert.equal(assignState.getLexeme().getValue(), '=')
        assert.equal(null, elseBlock)
    })

    it('test_ifElse', () => {
        const it = createToken(`if(a){
            a = 0
        } else {
            a = 1
            a = a * 2
        }`)
        const state = IfState.parse(it)
        const expr = state.getExpr()
        const block = state.getBlock()
        const assignState = block.getChild(0)
        const elseBlock = state.getChild(2)
        const assignState_2 = elseBlock.getChild(0)

        assert.equal(expr.getLexeme().getValue(), 'a')
        assert.equal(assignState.getLexeme().getValue(), '=')
        assert.equal(assignState_2.getLexeme().getValue(), '=')
        assert.equal(elseBlock.getChildren().length, 2)
    })
})
