const Expression = require('./Expression')
const NodeType = require("./NodeType")

class CallExpr extends Expression {
    constructor() {
        super()
        this.type = NodeType.CALL_EXPR
        this.label = "call"
    }

}

module.exports = CallExpr 

// func_name(expression, expression, ...)
// add(a = 1, 2)
CallExpr.parse = (factor, it) => {
    const expr = new CallExpr()
    // 'func_name'.
    expr.addChild(factor)
    // Left '('.
    it.nextMatch('(')
    // Recursively add expressions or variables in the parenthesis.
    let p = null
    while((p = Expression.parse(it)) != null) {
        expr.addChild(p)
        // If next character is not ')', match the ',' in the parenthesis.
        if(!it.peek().getValue() === ')') {
            it.nextMatch(',')
        }
    }
    // Right ')'.
    it.nextMatch(')')

    return expr
}
