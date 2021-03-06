const Discord = require("discord.js")
const config = require('../../config.json')


module.exports = {
    name: 'coinflip',
    description: 'Flips a coin',
    usage: '```' + `${config.prefix}coinflip` + '```',
    example: '```' + `${config.prefix}coinflip` + '```',
    items: '```'  + `If you want to have multiple simulations, you can try the ${config.prefix}rolldice command!` + '```',
    async execute(client, message, args, Discord) {
        let result = parseInt((Math.random() * 2))

        let face = '';
        if(result == 0) {
            face = 'Heads'
        }
        else {
            face = 'Tails'
        }
        const resultEmbed = new Discord.MessageEmbed()
            .setTitle('Coinflip Result')
            .addField('Result', face)
            .setColor(config.colors.default)
        return message.channel.send(resultEmbed)
    }
}