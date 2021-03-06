//require the file system
const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'reloads a command',
    cooldown: 5,
    dev: true,
    args: true,
    usage: "<command>",
	execute(message, args) {
        
        //get the target command's name
        const commandName = args[0].toLowerCase();
        
        //get the target command
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        //check that the requested command is valad
        if (!command) {
            return message.channel.send(`There is no command with the name or alias \`${commandName}\`, ${message.author}!`);
        }

        //get the location of the command file
        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

        //delete the command file
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        //replace the old file with the new and updated one
        try {
	        const newCommand = require(`../${folderName}/${command.name}.js`);
	        message.client.commands.set(newCommand.name, newCommand);
	        message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
        } catch (error) {
	        console.error(error);
	        message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
	},
};