/**
 * Generate an interator.
 * @param {*} array 
 */

function * arrayGenerator(array){
    for (let i = 0; i < array.length; i++){
        yield array[i]
    }
}

module.exports = arrayGenerator