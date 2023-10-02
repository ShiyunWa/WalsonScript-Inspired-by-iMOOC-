const TokenClass = require('./TokenClass')
const CharType = require('./CharType')
const LexerException = require('./LexerException')

const KeyWords = new Set([
    'var',
    'if',
    'else',
    'for',
    'while',
    'break',
    'func',
    'return',
    'int',
    'float',
    'bool',
    'void',
    'string'
]);

class Token{
    constructor(type, value){
        this._type = type;
        this._value = value;
    }

    getType(){
        return this._type;
    }

    getValue(){
        return this._value;
    }

    isVariable(){
        return this._type == TokenClass.VARIABLE;
    }

    isValue() {
        return this.isScalar() || this.isVariable();
    }

    isType() {
        return (
          this._value === "bool" ||
          this._value === "int" ||
          this._value === "float" ||
          this._value === "void" ||
          this._value === "string"
        );
      }

    isScalar(){
        return(
        this._type == TokenClass.INTEGER ||
        this._type == TokenClass.FLOAT ||
        this._type == TokenClass.STRING ||
        this._type == TokenClass.BOOLEAN
        );
    }

    toString(){
        return `type ${this._type.type}, value ${this._value}`;
    }

    // if a = 1
    static selectCharType(it){
        let str = '';

        // Loop while it has next value.
        // Peek each value and concatenate the literal one to the string.
        while (it.hasNext()){
            const char = it.peek();

            if (CharType.isLiteral(char)){
                str += char;
            }
            else{
                break;
            }
            // Logically equal to i++, it is the alleged "iterator"!
            it.next(); 
        }

        // Judge specific data type.
        if (KeyWords.has(str)){
            return new Token(TokenClass.KEYWORD, str);
        }

        if (str == 'true' || str == 'false'){
            return new Token(TokenClass.BOOLEAN, str);
        }

        return new Token(TokenClass.VARIABLE, str);
    }

    static makeString(it){
        let str = '';
        let state = 0;
        
        while (it.hasNext()){
            // The difference from the former selectCharType:
            // This is a Finite State Machine, and the 0-1 state, to be exact,
            // if the value is invalid, we do not have to peek it.
            let char = it.next();

            switch (state) {
                case 0:
                    if (char == '"'){
                        state = 1;
                    }
                    else{
                        state = 2;
                    }
                    str += char;
                    break;

                case 1:
                    if (char == '"'){
                        return new Token(TokenClass.STRING, str + char);
                    }
                    else{
                        str += char;
                    }
                    break;
                
                case 2:
                    if (char == "'"){
                        return new Token(TokenClass.STRING, str + char);
                    }
                    else{
                        str += char;
                    }
                    break;
            }
        }

        throw new LexerException('Unexpected Error in makeString!');
    }

    static makeOperator(it){
        let state = 0;
        while (it.hasNext()) {
            let lookahead = it.next();

            switch (state) {
                case 0:
                    switch (lookahead) {
                        case '+':
                            state = 1;
                            break;
                        case '-':
                            state = 2;
                            break;
                        case '*':
                            state = 3;
                            break;
                        case '/':
                            state = 4;
                            break;
                        case '>':
                            state = 5;
                            break;
                        case '<':
                            state = 6;
                            break;
                        case '=':
                            state = 7;
                            break;
                        case '!':
                            state = 8;
                            break;
                        case '&':
                            state = 9;
                            break;
                        case '|':
                            state = 10;
                            break;
                        case '^':
                            state = 11;
                            break;
                        case '%':
                            state = 12;
                            break;
                        case ',':
                            return new Token(TokenClass.OPERATOR, ',');                      
                        case ';':
                            return new Token(TokenClass.OPERATOR, ';');    
                    }
                    break;
                case 1: {
                    if (lookahead == '+'){
                        return new Token(TokenClass.OPERATOR, '++');
                    }
                    else if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '+=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '+');
                    }
                }
                case 2:
                    if (lookahead == '-'){
                        return new Token(TokenClass.OPERATOR, '--');
                    }
                    else if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '-=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '-');
                    }
                
                case 3:
                    if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '*=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '*');
                    }
                
                case 4:
                    if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '/=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '/');
                    }
                
                case 5:
                    if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '>=');
                    }
                    else if (lookahead == '>'){
                        return new Token(TokenClass.OPERATOR, '>>');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '>');
                    }
                
                case 6:
                    if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '<=');
                    }
                    else if (lookahead == '<'){
                        return new Token(TokenClass.OPERATOR, '<<');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '<');
                    }
                
                case 7:
                    if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '==');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '=');
                    }
                
                case 8:
                    if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '!=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '!');
                    }
                
                case 9:
                    if (lookahead == '&'){
                        return new Token(TokenClass.OPERATOR, '&&');
                    }
                    else if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '&=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '&');
                    }
                
                case 10:
                    if (lookahead == '|'){
                        return new Token(TokenClass.OPERATOR, '||');
                    }
                    else if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '|=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '|');
                    }
                
                case 11:
                    if (lookahead == '^'){
                        return new Token(TokenClass.OPERATOR, '^^');
                    }
                    else if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '^=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '^');
                   }
                
                case 12:
                    if (lookahead == '='){
                        return new Token(TokenClass.OPERATOR, '%=');
                    }
                    else{
                        it.putPeek();
                        return new Token(TokenClass.OPERATOR, '%');
                    }    
            }
        }

        throw new LexerException('Unexpected error in makeOperator!');
    }

    static makeNumber(it){
        let state = 0;
        let str = '';

        while (it.hasNext()) {
            let lookahead = it.peek();

            switch(state) {
                case 0:
                    if (lookahead == '0'){
                        state = 1;
                    }
                    else if (CharType.isNumber(lookahead)){
                        state = 2;
                    }
                    else if (lookahead == '+' || lookahead == '-'){
                        state = 3;
                    }
                    else if (lookahead == '.'){
                        state = 5;
                    }
                    break;
                case 1:
                    if (lookahead == '0'){
                        state = 1;
                    }
                    else if (lookahead == '.'){
                        state = 4;
                    }
                    else if (CharType.isNumber(lookahead)){
                        state = 2;
                    }
                    else{
                        return new Token(TokenClass.INTEGER, str);
                    }
                    break;
                case 2:
                    if (CharType.isNumber(lookahead)){
                        state = 2;
                    }
                    else if (lookahead == '.'){
                        state = 4;
                    }
                    else{
                        return new Token(TokenClass.INTEGER, str);
                    }
                    break;
                case 3:
                    if (CharType.isNumber(lookahead)){
                        state = 2;
                    }
                    else if (lookahead == '.'){
                        state = 5;
                    }
                    else{
                        throw LexerException.fromChar(lookahead);
                    }
                    break;
                case 4:
                    if (lookahead == ".") {
                        throw LexerException.fromChar(lookahead);
                      }
                      else if (CharType.isNumber(lookahead)) {
                        state = 4;
                      }
                      else {
                        return new Token(TokenClass.FLOAT, str);
                      }
                      break;
                case 5:
                    if (CharType.isNumber(lookahead)) {
                        state = 4;
                      }
                      else {
                        throw LexerException.fromChar(lookahead);
                      }
                      break;
            }

            str += lookahead;
            it.next();
        }

        throw new LexerException('Unexpected error in makeNumber!')
    }
}

module.exports = Token;