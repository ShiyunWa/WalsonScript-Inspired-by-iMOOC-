const Enum = require('../../common/Enum')

module.exports = {
    BLOCK : new Enum('BLOCK', 1),
    BINARY_EXPR : new Enum('BINARY_EXPR', 2),
    UNARY_EXPR : new Enum('UNARY_EXPR', 3),
    VARIABLE : new Enum('VARIABLE', 4),
    IF_STATE : new Enum('IF_STATE', 5),
    WHILE_STATE : new Enum('WHILE_STATE', 6),
    FOR_STATE : new Enum('FOR_STATE', 7),
    ASSIGN_STATE : new Enum('ASSIGN_STATE', 8),
    FUNC_STATE : new Enum('FUNC_STATE', 9),
    DECLARE_STATE : new Enum('DECLARE_STATE', 10),
    SCALAR : new Enum('SCALAR', 11),
    RETURN_STATE : new Enum('RETURN_STATE', 12),
    FUNC_ARGS : new Enum('FUNC_ARGS', 13),
    CALL_EXPR : new Enum('CALL_EXPR', 14)
}