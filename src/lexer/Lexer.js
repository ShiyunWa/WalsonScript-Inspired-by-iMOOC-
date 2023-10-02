const Peek = require('../common/Peek')
const CharType = require('./CharType')
const LexerException = require('./LexerException')
const Token = require('./Token')
const TokenClass = require('./TokenClass')
const arrayGenerator = require('../common/arrayGenerator')
const PeekToken = require('../parser/utility/PeekToken')
const fs = require('fs')

class Lexer{
    analyse(str){
        const tokens = [];
        const it = new Peek(str, '\0');

        while (it.hasNext()) {
            let char = it.next();
            if (char == '\0'){
                break;
            }
            let lookahead = it.peek();

            // Do not process whitespace and '\n'.
            if (char == ' ' || char == '\n' || char == '\r'){
                continue;
            }

            // Annotation
            if (char == '/'){
                // If the prefix is '//', then omit all the following contents until reaching the tail '\n'.
                if (lookahead == '/'){
                    while (it.hasNext() && (char = it.next()) != '\n');
                    continue;
                }
                // If the prefix is '/*', then omit all the following contents until reaching the '*/'.
                else if (lookahead == '*'){
                    let flag = false;
                    while (it.hasNext()){
                        const p = it.next();
                        if (p == '*' && it.peek() == '/'){
                            flag = true;
                            it.next();
                            break;
                        }
                    }

                    if (!flag){
                        throw new LexerException('Matching annotations error!');
                    }
                    continue;
                }
            }

            // Omit brackets.
            if (char == '{' || char == '}' || char == '(' || char == ')' ){
                tokens.push(new Token(TokenClass.BRACKET, char));
                continue;
            }

            // Read a string.
            if (char == '"' || char == "'"){
                it.putPeek();
                tokens.push(Token.makeString(it));
                continue;
            }

            // Split keywords and variables.
            if (CharType.isLetter(char)){
                it.putPeek();
                tokens.push(Token.selectCharType(it));
                continue;
            }

            // Read unsigned numbers.
            if (CharType.isNumber(char)){
                it.putPeek();
                tokens.push(Token.makeNumber(it));
                continue;
            }

            // Read numbers with a sign.
            if ((char == '+' || char == '-') && CharType.isNumber(lookahead)){
                const lastToken = tokens[tokens.length - 1] || null;

                // Omit
                // a+1 (lastToken == 'a'  char == '+'  CharType.isNumber(lookahead))
                // 1+1 (lastToken == '1'  char == '+'  CharType.isNumber(lookahead))
                // Read
                // +1 (lastToken == 'null'  char == '+'  CharType.isNumber(lookahead))
                // 1*-1 (lastToken == '*'  char == '-'  CharType.isNumber(lookahead))
                if (lastToken == null || !lastToken.isValue()){
                    it.putPeek();
                    tokens.push(Token.makeNumber(it));
                    continue;
                }
            }

             // Read operators.
            if (CharType.isOperator(char)){
                it.putPeek();
                tokens.push(Token.makeOperator(it));
                continue;
            }

            throw LexerException.fromChar(char);            
        }

        return tokens;
    }

    static fromFile(src) {
        const content = fs.readFileSync(src, "utf-8")
        const lexer = new Lexer()
        return arrayGenerator(lexer.analyse(arrayGenerator(content)))
    }
}

module.exports = Lexer;