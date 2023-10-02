const Statement = require('./Statement')
const NodeType = require('./NodeType')
const TokenClass = require('../../lexer/TokenClass')
const ParseException = require('../utility/ParseException')

// func add(args ...) int Block
class FuncState extends Statement{
    constructor(){
        super(NodeType.FUNC_STATE, 'func')
    }

    getFuncVal(){
        return this.getChild(0)
    }

    getArgs(){
        return this.getChild(1)
    }

    getFuncType(){
        return this.getFuncVal().getTypeLexeme().getValue()
    }

    getBlock(){
        return this.getChild(2)
    }
}

module.exports = FuncState

const {Factor, FuncArgs, Block} = require('./index')

// func add(args... ) int Block
FuncState.parse = it => {
    // 'func'.
    it.nextMatch('func')

    const func = new FuncState()

    // Function name, 'add'.
    const functionVariable = Factor.parse(it)
    func.setLexeme(functionVariable.getLexeme())
    func.addChild(functionVariable)

    // ( 'FuncArgs' )
    it.nextMatch('(')
    const args = FuncArgs.parse(it)
    func.addChild(args)
    it.nextMatch(')')

    // Function data type, 'int'.
    const keyword = it.nextMatchType(TokenClass.KEYWORD)
    if (!keyword.isType()){
        throw ParseException.fromToken(keyword)
    }

    // 'Block'
    functionVariable.setTypeLexeme(keyword)
    const block = Block.parse(it)
    func.addChild(block)

    return func
}