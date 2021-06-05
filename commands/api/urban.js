//require modules here
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
        
        //format the search terms correctly
        const query = querystring.stringify({ term: args.join(' ') });
    
        //request the data for the serch terms
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
            .then(response => response.json());
        //if there are no serch results, dysplay that
        if (!list.length) {
            return message.channel.send(`No results were found for **${args.join(' ')}**.`);
        }

        //trim the content to fit in the embed
        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        
        //get the first respose of the json
        const [answer] = list;
        
        //create an embed for the serch results
        const embed = new Discord.MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up.\n${answer.thumbs_down} thumbs down.` },
            );
        //send the serch results as an embed
        message.channel.send(embed);
	},
};