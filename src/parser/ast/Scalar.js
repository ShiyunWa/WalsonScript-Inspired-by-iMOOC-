const Factor = require('./Factor')
const NodeType = require('./NodeType')

class Scalar extends Factor{
    constructor(token){
        super(token)
        this.type = NodeType.SCALAR
    }
}

module.exports = Scalar