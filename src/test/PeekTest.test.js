const Peek = require('../common/Peek')
const arrayGenerator = require('../common/arrayGenerator')

const {assert} = require('chai')

describe('Test PeekIterator', () => {

    // Test the functions of next() and peek() in a generated iterator.
    it('test_peek', () => {
        const it = new Peek(arrayGenerator([..."abcdefg"]))
        // Next() will point at the next character in the iterator.
        assert.equal(it.next(), 'a')
        assert.equal(it.next(), 'b')
        // Stack is empty, peek() will get the character of the next "point".
        assert.equal(it.peek(), 'c')
        // Stack is not empty, peek() the "tail" of the stack.
        assert.equal(it.peek(), 'c')
        assert.equal(it.next(), 'c')
        assert.equal(it.next(), 'd')  
    })

    it('test_putBack', () => {
        const it = new Peek(arrayGenerator([..."abcdefg"]))
        assert.equal(it.next(), 'a')
        assert.equal(it.peek(), 'b')
        assert.equal(it.peek(), 'b')
        assert.equal(it.next(), 'b')
        assert.equal(it.next(), 'c')
        // Put two values in the stack, 'c' and 'b', respectively.
        it.putPeek()
        it.putPeek()
        // Now, the prior value in the stack is 'b'.
        assert.equal(it.next(), 'b')
        assert.equal(it.next(), 'c')
    })

    it('test_endToken', () => {
        const it = new Peek(arrayGenerator([..."abcdefg"]), '\0')
        for (let i = 0; i < 8; ++i){
            if (i == 7){
                assert.equal(it.next(), '\0')
            }
            else{
                assert.equal(it.next(), 'abcdefg'[i])
            }
        }
    })
})