const ASTreeNode = require('./ASTreeNode')

class Statement extends ASTreeNode{
    constructor(type, label){
        super(type, label)
    }
}

module.exports = Statement

Statement.parse = (it) => {
    const {
        AssignState,
        DeclareState,
        FuncState,
        ReturnState,
        IfState,
        Block,
        Expression
    } = require('./index')
    
    if (!it.hasNext()){
        return null;
    }

    const token = it.next();
    const lookahead = it.next();
    it.putPeek();

    if (token.isVariable() && lookahead.getValue() === '='){
        return AssignState.parse(it);
    }
    else if (token.getValue() === 'var'){
        return DeclareState.parse(it);
    }
    else if (token.getValue() === 'func'){
        return FuncState.parse(it);
    }
    else if (token.getValue() === 'return'){
        return ReturnState.parse(it);
    }
    else if (token.getValue() === 'if'){
        return IfState.parse(it);
    }
    else if (token.getValue() === '{'){
        return Block.parse(it);
    }
    else{
        return Expression.parse(it);
    }
}