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
        
        const json = await fetch(`https://api.hypixel.net/player?name=${args[0]}&key=${key}`).then(response => response.json());
		
		if (json.success === false) {
			return message.channel.send('there was an error because '+json.cause+"\nIt must of been because of Lucas's SkyWars wins.");
		}

        const level = ((Math.sqrt(json.player.networkExp + 15312.5)) - (125 / Math.sqrt(2))) / (25 * Math.sqrt(2));
		
		let level2 = Math.round(level);

		if (level < level2) {
			level2--;
		}

		let dualswinstreak;

		if (!json.player.Duels) {
			dualswinstreak = 0;
		} else {
			dualswinstreak = json.player.Duels.current_winstreak;
		}

		let bedwarsfinalkills;

		if (!json.player.stats.Bedwars) {
			bedwarsfinalkills = 0;
		} else {
			bedwarsfinalkills = json.player.stats.Bedwars.final_kills_bedwars;
		}

		let skywarswins;
		let skywarskills;

		if (!json.player.stats.SkyWars) {
			skywarswins = 0;
			skywarskills = 0;
		} else {
			skywarswins = json.player.stats.SkyWars.wins;
			skywarskills = json.player.stats.SkyWars.kills;
		}

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
		message.channel.send(embed);
	},
};