const ASTreeNode = require('./ASTreeNode')
const NodeType = require('./NodeType')


class FuncArgs extends ASTreeNode{
    constructor(){
        super(NodeType.FUNC_ARGS, 'args')
    }
}

module.exports = FuncArgs

const {Factor} = require('./index')

// (int a, var b, string c)
FuncArgs.parse = it => { 
    const args = new FuncArgs()

    while (it.peek().isType()){
        // 'int'
        const type = it.next()
        // 'a'
        const variable = Factor.parse(it)
        // Left child, 'a'.
        args.addChild(variable)
        variable.setTypeLexeme(type)

        // If next character is not ')', match the ',' in the parenthesis.
        if (it.peek().getValue() !== ')'){
            it.nextMatch(',')
        }
    }

    return args
}