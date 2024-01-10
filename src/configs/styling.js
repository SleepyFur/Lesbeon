const { bgBlack, bgBlue, bgCyan, bgGreen, bgMagenta, bgRed, bgWhite, bgYellow, italic } = require ('ansicolor');

const colours = {
    black: '\x1b[30m',
    white: '\x1b[37m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    orange: '\x1b[38;5;208m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    bgBlack: '\x1b[40m',
    bgWhite: '\x1b[47m',
    bgRed: '\x1b[41m',
    bgorange: '\x1b[48;5;208m',
    bgYellow: '\x1b[43m',
    bgGreen: '\x1b[42m',
    bgBlue: '\x1b[44m',
    bgCyan: '\x1b[46m',
    bgMagenta: '\x1b[45m',
};

const style = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    italicise: '\x1b[3m',
    underline: '\x1b[4m',
    inverse: '\x1b[7m'
};

module.exports = { ...colours, ...style };