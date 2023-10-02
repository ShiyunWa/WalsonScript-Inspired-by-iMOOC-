const Statement = require('./Statement')
const NodeType = require('./NodeType')

class Block extends Statement{
    constructor(){
        super(NodeType.BLOCK, 'block')
    }
}

module.exports = Block

// {Statement Statement Statement...}
Block.parse = (it) => {
    // Left '{'.
    it.nextMatch('{')
    // 'Statements'.
    const block = new Block()
    let state = null
    while ( (state = Statement.parse(it)) != null){
        block.addChild(state);
    }
    // Right '}'.
    it.nextMatch('}')
    return block
}
