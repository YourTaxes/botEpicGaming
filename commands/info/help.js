//require the prefix
const Discord = require('discord.js');
const fs = require('fs');
const { prefix } = require('../../config.json');
const currnecycommands = new Discord.Collection;

const ccmandfolder = fs.readdirSync('./currency_commands');

for (const file of ccmandfolder) {
    const ccomand = require(`../../currency_commands/${file}`);
    currnecycommands.set(ccomand.name, ccomand);
}

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['command', 'commands'],
    usage: '<command name>',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        //dm a complete list of the commands
        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', \n'));
            data.push('\nThese are the currency commands:');
            data.push(currnecycommands.map(ccomand => ccomand.name).join(', \n'));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true})
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.autor.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you! Do you have youe DMs disabled?');
                })
        }

        //get the name of the command
        const name = args[0].toLowerCase();

        const allcommands = commands.concat(currnecycommands);

        //find the command file
        const command = allcommands.get(name) || allcommands.find(c => c.aliases && c.aliases.includes(name));

        //check the requested command is valad
        if (!command) {
            return message.reply('that\'s not a valad command!');
        }

        //dysplay all of the command's data
        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        if (command.notes) data.push(`**Extra Notes:** ${command.notes}`);

        message.channel.send(data, {split: true });

    },
};