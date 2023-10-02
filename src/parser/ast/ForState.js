const Statement = require('./Statement')
const NodeType = require('./NodeType')

class ForState extends Statement{
    constructor(){
        super(NodeType.FOR_STATE, 'for')
    }
}

module.exports = ForState