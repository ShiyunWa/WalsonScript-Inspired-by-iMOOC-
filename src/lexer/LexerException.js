class LexerException extends Error{
    constructor(msg){
        super(msg)
    }

    static fromChar(char){
        return new LexerException(`Unexpected character ${char}`)
    }
}

module.exports = LexerException