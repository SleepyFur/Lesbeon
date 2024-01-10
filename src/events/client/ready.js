const colours = require('../../configs/styling');
const style = require('../../configs/styling')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`\n${style.inverse}${style.bold}${colours.green} READY: ${colours.reset} ${client.user.tag} successfully connected, monitoring;`)
    }
}