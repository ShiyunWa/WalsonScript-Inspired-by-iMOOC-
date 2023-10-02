module.exports = {
    get AssignState(){
        return require('./AssignState')
    },
    get Block(){
        return require('./Block')
    },
    get CallExpr(){
        return require('./CallExpr')
    },
    get DeclareState(){
        return require('./DeclareState')
    },
    get Expression(){
        return require('./Expression')
    },
    get Factor(){
        return require('./Factor')
    },
    get ForState(){
        return require('./Forstate')
    },
    get FuncArgs(){
        return require('./FuncArgs')
    },
    get FuncState(){
        return require('./FuncState')
    },
    get IfState(){
        return require('./IfState')
    },
    get ReturnState(){
        return require('./ReturnState')
    },
    get Scalar(){
        return require('./Scalar')
    },
    get Statement(){
        return require('./Statement')
    },
    get Variable(){
        return require('./Variable')
    }

}