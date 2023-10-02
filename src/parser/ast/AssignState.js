const Statement = require('./Statement')
const NodeType = require('./NodeType')
const ParseException = require('../utility/ParseException')

class AssignState extends Statement{
    constructor(){
        super(NodeType.ASSIGN_STATE, 'assign');
    }
}

const {Factor, Expression} = require('./index');

// a = expression
AssignState.parse = it => {
    const state = new AssignState();
    const tkn = it.peek();
    const factor = Factor.parse(it);

    if (factor == null){
        throw ParseException.fromToken(tkn);
    }

    // Left child, 'a'.
    state.addChild(factor);
    // Root, '='.
    const lexeme = it.nextMatch('=');
    const expr = Expression.parse(it);
    // Right child, 'Expression'.
    state.addChild(expr);
    state.setLexeme(lexeme);

    return state;
};

module.exports = AssignState;