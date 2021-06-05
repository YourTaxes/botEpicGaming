//Here it requires things
const Discord = require('discord.js');
const fetch = require('node-fetch');
const { key } = require('../../config.json');

module.exports = {
	name: 'hypixel',
	description: 'Gives the Hypixel stats for a player by username',
	cooldown: 5,
	notes: 'This command may take a second or be buggy, so keep that in mind. Also, you can\'t request the same player multiple times in a minuite',
    usage: '<username>',
    args: true,
	async execute(message, args) {
        
		//fetching the data to use in the hypixel api
        const json = await fetch(`https://api.hypixel.net/player?name=${args[0]}&key=${key}`).then(response => response.json());
		
		//checks if the request was successfull, if not, it says it failed and why
		if (json.success === false) {
			return message.channel.send('there was an error because '+json.cause+"\nIt must of been because of Lucas's SkyWars wins.");
		}

		//calculating the network level of a player
        const level = ((Math.sqrt(json.player.networkExp + 15312.5)) - (125 / Math.sqrt(2))) / (25 * Math.sqrt(2));
		
		let level2 = Math.round(level);

		if (level < level2) {
			level2--;
		}

		//checking if the player has played Duels, if they have say their winstreak, if they haven't, set their winstreak to 0
		let dualswinstreak;

		if (!json.player.Duels) {
			dualswinstreak = 0;
		} else {
			dualswinstreak = json.player.Duels.current_winstreak;
		}

		//checking if the player has played Bedwars, if they have say their final kills, if they haven't, set their final kills to 0
		let bedwarsfinalkills;

		if (!json.player.stats.Bedwars) {
			bedwarsfinalkills = 0;
		} else {
			bedwarsfinalkills = json.player.stats.Bedwars.final_kills_bedwars;
		}

		//checking if the player has played Skywars, if they have say their wins and kills, if they haven't, set both to 0
		let skywarswins;
		let skywarskills;

		if (!json.player.stats.SkyWars) {
			skywarswins = 0;
			skywarskills = 0;
		} else {
			skywarswins = json.player.stats.SkyWars.wins;
			skywarskills = json.player.stats.SkyWars.kills;
		}

		//create an embed that has the player's name, network level, bedwars level, duals winstreak, bedwars final kills, skywars wins and final kills, and karma
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(`Stats For ${json.player.displayname}`)
			.addFields(
				{ name: 'Server Level', value: level2 },
				{ name: 'Bedwars Level', value: json.player.achievements.bedwars_level},
				{ name: 'Duals Winstreak', value: dualswinstreak },
				{ name: 'Bedwars Final Kills', value: bedwarsfinalkills},
				{ name: 'Skywars Wins', value: skywarswins},
				{ name: 'Skywars Kills', value: skywarskills},
				{ name: 'Karma', value: json.player.karma },
			);
		//sends the embed
		message.channel.send(embed);
	},
};