const ASTreeNode = require('./ASTreeNode')
const NodeType = require('./NodeType')
const table = require('../utility/PriorityType')

class Expression extends ASTreeNode{
    constructor(){
        super();
    }

    static fromToken(type, token){
        const expr = new Expression();
        expr.label = token.getValue();
        expr.lexeme = token;
        expr.type = type;
        return expr;
    }
}

module.exports = Expression;

const { Factor, CallExpr } = require("./index");
    /**
     * Left recursion: E(k) -> E(k) op(k) E(k+1) | E(K+1)
     * Right recursion: E(k) -> E(k+1) E_(k)
     *                  E_(k) -> op(k) E(k+1) E_(k) | e
     * Terminal: E(t) -> F E_(t) | U E_(t)
     */
Expression.parse = it =>{
    return Expression.E(it, 0);
};

Expression.E = (it, k) => {
    // Recursion: E(k) -> E(k+1) E_(k)
    if (k < table.length - 1){
        return Expression.combine(
            it,
            () => Expression.E(it, k + 1),
            () => Expression.E_(it, k)
        );
    }
    else{ // Terminal: E(t) -> F E_(t) | U E_(t)
        return Expression.race(
            it,
            // funcA
            () =>
              Expression.combine(
                it,
                () => Expression.F(it),
                () => Expression.E_(it, k)
                ),
                //funcB
            () =>
              Expression.combine(
                it,
                () => Expression.U(it),
                () => Expression.E_(it, k)
              )
        );
    }
};

    // E_(k) -> op(k) E(k+1) E_(k) | e
Expression.E_ = (it, k) => {
    const token = it.peek();
    const value = token.getValue();

    if (table[k].indexOf(value) !== -1){
        it.nextMatch(value)
        const expr = Expression.fromToken(NodeType.BINARY_EXPR, token);
        expr.addChild(
            Expression.combine(
                it,
                () => Expression.E(it, k + 1),
                () => Expression.E_(it, k, it)
            )
        );
         return expr;
    }
    return null;
};

Expression.U = it =>{
    const token = it.peek();
    const value = token.getValue();

    if (value === '('){
        it.nextMatch('(');
        const expr = Expression.parse(it);
        it.nextMatch(')');
        return expr;
    }
    else if (value === '++' || value === '--' || value === '!'){
        const t = it.peek();
        it.nextMatch(value);
        const expr = Expression.fromToken(NodeType.UNARY_EXPR, t);
        expr.addChild(Expression.parse(it));
        return expr;
    }
    return null;
};

Expression.F = it =>{
    const factor = Factor.parse(it);
    if (factor == null) {
        return null;
    }
    if (it.hasNext() && it.peek().getValue() === '(') {
        return CallExpr.parse(factor, it);
    }
    return factor;
};

Expression.combine = (it, funcA, funcB) =>{
    if (!it.hasNext()){
        return null;
    }

    const a = funcA();
    if (a == null){
        return null;
    }

    const b = it.hasNext() ? funcB() : null;
    if (b == null){
        return a;
    }

    const expr = Expression.fromToken(NodeType.BINARY_EXPR, b.lexeme);
    expr.addChild(a);
    expr.addChild(b.getChild(0));
    return expr;
};

Expression.race = (it, funcA, funcB) =>{
    if (!it.hasNext()){
        return null;
    }
    const a = funcA();
    if (a == null){
        return funcB();
    }
    return a;
};