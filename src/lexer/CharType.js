/**
 * @file Classify distinct types of charaters by using regular expression.
 */

class CharType{

    static Letter = /^[a-zA-Z]$/
    static Number = /^[0-9]$/
    static Literal = /^[_a-zA-Z0-9]$/
    static Operator = /^[+\-*/><=!&|^%,]$/

    static isLetter(char){
        return CharType.Letter.test(char)
    }

    static isNumber(char){
        return CharType.Number.test(char)
    }

    static isLiteral(char){
        return CharType.Literal.test(char)
    }

    static isOperator(char){
        return CharType.Operator.test(char)
    }
}

module.exports = CharType