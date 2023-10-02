const Peek = require('../../common/Peek')
const ParseException = require('./ParseException')

class PeekToken extends Peek{
    constructor(it){
        super(it)
    }

    nextMatch(value) {
        const token = this.next()
        if(token.getValue() !== value) {
            throw ParseException.fromToken(token)
        }
        return token
    }

    nextMatchType(type){
        const token = this.next()

        if (token.getType() !== type){
            throw ParseException.fromToken(token)
        }

        return token
    }
}

module.exports = PeekToken