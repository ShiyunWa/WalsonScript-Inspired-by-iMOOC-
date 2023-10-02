const Expression = require('./ast/Expression')
const NodeType = require('./ast/NodeType')
const Factor = require('./ast/Factor')

class SimpleParser{

    // Expression -> i + Expression | i
    // i -> 0|1|2|3|4|5|6|7|8|9
    static parse(it){
        const expr = new Expression(null)
        const scalar = Factor.parse(it)

        // Terminal i on the right hand.
        if (!it.hasNext()){
            return scalar
        }

        // Left child, scalar 'i'.
        expr.addChild(scalar)
        // Root, '+'.
        const operator = it.nextMatch('+')
        expr.label = '+'
        expr.type = NodeType.BINARY_EXPR
        expr.lexeme = operator
        // Right child, recursive 'Expression'.
        expr.addChild(SimpleParser.parse(it))

        return expr
    }
}

module.exports = SimpleParser