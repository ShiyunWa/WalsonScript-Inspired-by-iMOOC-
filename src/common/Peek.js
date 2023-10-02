const LinkedList = require('linkedlist')

const CACHE_SIZE = 10

class Peek{
    constructor(it, endToken = null){
        this.it = it
        this.stackPutBack = new LinkedList()
        this.queueCache = new LinkedList()
        this.endToken = endToken
    }

    peek(){
        // If the stack is not empty, directly get the tail of the stack, namely, the top value.
        if (this.stackPutBack.length > 0){
            return this.stackPutBack.tail
        }
        // If the stack is empty, get next "point" and then put it in the stack.
        const val = this.next()
        this.putPeek()
        return val
    }

    putPeek(){
        if (this.queueCache.length > 0){
            // Get the latest value in the cache (just has been put in the cache).
            this.stackPutBack.push(this.queueCache.pop())
        }
    }

    hasNext(){
        // !!null -> !True -> False
        // Logically equal to converting null to a boolean type value.
        return this.endToken || !!this.peek()
    }

    next(){
        let val = null

        if (this.stackPutBack.length > 0){
            val = this.stackPutBack.pop()
        }
        else{
            val = this.it.next().value
            if (val === undefined){
                const tmp = this.endToken
                this.endToken = null
                val = tmp
            }
        }

        // Cache processing
        // Remove all the other elements that are out of the time window in terms of the length of the window.
        // Then push these removed elements.
        while (this.queueCache.length > CACHE_SIZE - 1) {
            this.queueCache.shift()
        }
        this.queueCache.push(val)

        return val
    }
}

module.exports = Peek