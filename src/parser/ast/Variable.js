const {Factor} = require('./index')
const NodeType = require('./NodeType')

class Variable extends Factor{
    constructor(token){
        super(token)
        this.type = NodeType.VARIABLE
        this.typeLexeme = null
    }

    setTypeLexeme(lexeme){
        this.typeLexeme = lexeme
    }

    getTypeLexeme(){
        return this.typeLexeme
    }
}

module.exports = Variable