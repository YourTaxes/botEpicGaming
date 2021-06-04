const fetch = require('node-fetch');
const querystring = require('querystring');
const Discord = require('discord.js');
module.exports = {
	name: 'urban',
	description: 'searches the definition of a word in urban dictonary',
    cooldown: 5,
    args: true,
    usage: '<word>',
    notes: 'This command may take a second or be buggy, so keep that in mind.',
    aliases: ['dictionary'],
	async execute(message, args) {
        if (!args.length) {
            return message.channel.send('You need to supply a search term!');
        }
        const query = querystring.stringify({ term: args.join(' ') });
    
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
            .then(response => response.json());
        if (!list.length) {
            return message.channel.send(`No results were found for **${args.join(' ')}**.`);
        }

        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            
        const [answer] = list;
    
        const embed = new Discord.MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up.\n${answer.thumbs_down} thumbs down.` },
            );
        message.channel.send(embed);
	},
};