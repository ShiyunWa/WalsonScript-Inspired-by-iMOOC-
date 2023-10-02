const NodeType = require('../ast/NodeType')
const Factor = require('../ast/Factor')
const LinkedList = require('linkedlist')

class ParserUtil{
    static toSuffixExpression(astNode){

        // node(left, operator, right)
        // expr: left right operator

        if(astNode instanceof Factor) {
            return astNode.getLexeme().getValue()
        }

        const prts = []
        for(const child of astNode.getChildren()) {
            prts.push(ParserUtil.toSuffixExpression(child));
        }
        const lexemeStr = astNode.getLexeme() != null ? astNode.getLexeme().getValue() : "";
        if(lexemeStr.length > 0) {
            return prts.join(" ") + " " + lexemeStr
        } else {
            return prts.join(" ")
        }
    }

    static toBFSString(root, max) {

        const queue = new LinkedList()
        const list = []
        queue.push(root)

        let c = 0
        //     a
        //   b     c
        // d  e  f   g
        while(queue.length > 0 && c++ < max) {
            const node = queue.shift()
            list.push(node.getLabel())
            for(const child of node.getChildren()) {
                queue.push(child);
            }
        }
        return list.join(" ")
    }
}

module.exports = ParserUtil