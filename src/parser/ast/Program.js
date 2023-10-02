const NodeType = require('./NodeType')
const ASTreeNode = require('./ASTreeNode')

class Program extends ASTreeNode{
    constructor(){
        super(NodeType.PROGRAM, 'program')
    }
}

module.exports = Program

const {Statement} = require('./index')

Program.parse = (it) => {
    const program = new Program()
    let state = null
    while( (state = Statement.parse(it)) != null) {
        program.addChild(state)
    }
    return program
}
