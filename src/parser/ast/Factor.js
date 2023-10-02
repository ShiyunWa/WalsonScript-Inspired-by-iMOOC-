const ASTreeNode = require('./ASTreeNode')
const TokeClass = require('../../lexer/TokenClass')

class Factor extends ASTreeNode{
    constructor(token){
        super();
        this.lexeme = token;
        this.label = token.getValue();
    }
}

module.exports = Factor;

const {Variable, Scalar} = require('./index');

// Return a variable or scalar; otherwise, return an epsilon.

Factor.parse = it => {
    const token = it.peek();
    const type = token.getType();

    if (type == TokeClass.VARIABLE){
        it.next();
        return new Variable(token);
    }
    else if (token.isScalar()){
        it.next();
        return new Scalar(token);
    }
    return null;
};