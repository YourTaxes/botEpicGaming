//requiring things here
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, devid} = require('./config.json');

//creating the client and instantiate the command collection
const client = new Discord.Client();
client.commands = new Discord.Collection();

//get the commands in the collection
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

//make a cooldown collection
client.cooldowns = new Discord.Collection();

//say when the bot is ready
client.once('ready', () => {
	console.log('Ready!');
});

//start the bot's responses
client.on('message', message => {

	//don't respond to itself or if there is no command
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	//format the command
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	//recognise aliases 
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	//don't react to invalad commands
	if (!command) return;

	//make sure guild commands are done inside of servers
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t excecute that command inside DMs!');
	}

	//make sure that dev commands can only be excecuted by devs
	if (command.dev && !(message.author.id === devid)) {
		return message.reply('You are not this bot\'s developer, so you can\'t use this command.');
	}

	//make sure the commands with arguments have arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		
		//show correct usage
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	
	//manage cooldowns
	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	
	//excecute commands
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

//loging in
client.login(token);