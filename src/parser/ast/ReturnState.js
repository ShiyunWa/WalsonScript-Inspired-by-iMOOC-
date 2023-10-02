const Statement = require('./Statement')
const NodeType = require('./NodeType')

class ReturnState extends Statement {
    constructor(){
        super(NodeType.RETURN_STATE, 'return')
    }
}

module.exports = ReturnState

const {Expression} = require('./index')

// return Expression
ReturnState.parse = (it) => {
    // 'return'
    const lexeme = it.nextMatch('return')
    // 'Expression'
    const expr = Expression.parse(it)
    const state = new ReturnState()
    state.setLexeme(lexeme)
    state.addChild(expr)
    
    return state;
}