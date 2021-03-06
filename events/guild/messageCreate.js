const Discord = require('discord.js');
const config = require('../../config.json');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = (Discord, client, message) => {

    const prefix = config.prefix;
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd)
    if(command) command.execute(client, message, args, Discord)

    if(message.content.startsWith(`${config.prefix}help`) && message.content != `${config.prefix}help`) {
        let commandName = args[0];
        if(!client.commands.find(cmd => cmd.name == commandName)) {
            let unknownCommand = new Discord.MessageEmbed()
                .setTitle('Command Error')
                .addField('Reason', `${config.errors.UNKNOWN_CMD_ERROR} Do ${config.prefix}help to see a list of commands!`, false)
                .addField('Usage', '```js\n' + `${config.prefix}help [command]` + '```')
                .setColor(config.colors.error)
            message.channel.send({ embeds: [unknownCommand] })
        }
        else {
            let findCommand = client.commands.find(cmd => cmd.name == commandName)
            const interactionBased = ['area'];
            if(!interactionBased.includes(findCommand.name)) {
                let knownCommand = new Discord.MessageEmbed()
                    .setTitle('Help: ' + commandName)
                    .addField('Description', findCommand.description, false)
                    .addField('Usage', findCommand.usage, false)
                    if(findCommand.example) {
                        knownCommand.addField('Example', findCommand.example.toString(), false)
                    }
                    if(findCommand.items) {
                        knownCommand.addField('Items', findCommand.items, false)
                    }
                    knownCommand.setColor(config.colors.default)
                    knownCommand.setFooter(`Polar ${config.version}`)
                    if(findCommand.image) {
                        knownCommand.setImage(findCommand.image)
                    }
                message.channel.send({ embeds: [knownCommand] })
            }
            else {
                const row = new MessageActionRow();
                row.addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select')
                        .setPlaceholder(findCommand.contextMenu.placeHolder)
                        .addOptions([
                            {
                                label: 'Select me',
                                description: 'This is a description',
                                value: 'first_option',
                            },
                            {
                                label: 'You can select me too',
                                description: 'This is also a description',
                                value: 'second_option',
                            },
                        ]),
                );
	        	message.channel.send({ content: 'Pong!', components: [row] });
            }
        }
    }

}