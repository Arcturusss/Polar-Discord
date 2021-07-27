const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command-handler', 'event-handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

client.login(config.discord)




