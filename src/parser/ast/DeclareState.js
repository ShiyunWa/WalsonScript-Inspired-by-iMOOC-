const Statement = require('./Statement')
const NodeType = require('./NodeType')

class DeclareState extends Statement{
    constructor(){
        super(NodeType.DECLARE_STATE, 'declare')
    }
}

module.exports = DeclareState

const {Factor, Expression} = require('./index')

// var a = expression
DeclareState.parse = (it) => {
    const state = new DeclareState()

    // 'var'
    it.nextMatch('var')
    // Left child, 'a'.
    const tkn = it.peek()
    const factor = Factor.parse(it)

    if (factor == null){
        throw ParseException.fromToken(tkn)
    }
    state.addChild(factor)
    // '='
    const lexeme = it.nextMatch('=')
    // Right child, 'Expression'.
    const expr = Expression.parse(it)
    state.addChild(expr)
    state.setLexeme(lexeme)

    return state
}