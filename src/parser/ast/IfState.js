const Statement = require('./Statement')
const NodeType = require('./NodeType')

// IfState -> if(Expression) Block Tail
class IfState extends Statement{
    constructor(){
        super(NodeType.IF_STATE, 'if');
    }

    getExpr(){
        return this.getChild(0);
    }

    getBlock(){
        return this.getChild(1);
    }

    getElseBlock(){
        const block = this.getChild(2);
        if (block instanceof Block){
            return block;
        }
        return null;
    }

    getElseIfState(){
        const ifState = this.getChild(2);
        if (ifState instanceof IfState){
            return ifState;
        }
        return null;
    }
}

module.exports = IfState

const {Expression, Block} = require('./index')

// IfState -> if(Expression) Block Tail
IfState.parse = (it) => {
    // 'if'
    const lexeme = it.nextMatch('if');

    // (Expression)
    it.nextMatch('(');
    const state = new IfState();
    state.setLexeme(lexeme);
    const expr = Expression.parse(it);
    state.addChild(expr);
    it.nextMatch(')');

    // 'Block'
    const block = Block.parse(it);
    state.addChild(block);

    // 'Tail'
    const tail = IfState.parseTail(it);
    if (tail != null){
        state.addChild(tail);
    }

    return state;
}

// Tail -> else Block | else IfState | epsilon
IfState.parseTail = (it) => {
    if (!it.hasNext() || it.peek().getValue() != 'else'){
        return null;
    }

    // 'else Block'
    it.nextMatch('else');
    const lookahead = it.peek();
    if (lookahead.getValue() === '{'){
        return Block.parse(it);
    }
    // 'else if'
    else if (lookahead.getValue() === 'if'){
        return IfState.parse(it);
    }
    else{
        return null;
    }
}