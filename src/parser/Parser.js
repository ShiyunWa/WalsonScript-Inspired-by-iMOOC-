const Lexer = require('../lexer/Lexer')
const arrayGenerator = require('../common/arrayGenerator')
const Program = require('../parser/ast/Program')
const PeekToken = require('../parser/utility/PeekToken')

class Parser {

    static parse(source) {
        const lexer = new Lexer()
        const  tokens = lexer.analyse(arrayGenerator([...source]))
        return Program.parse(new PeekToken(arrayGenerator(tokens)))
    }

    static fromFile(file) {
        var tokens = Lexer.fromFile(file)
        return Program.parse(new PeekToken(tokens))
    }
}

module.exports = Parser