module.exports = {
	name: 'bean',
	description: 'BEAN',
    guildOnly: true,
	execute(message, args) {
        //show a picture of BEANS
		message.channel.send("https://www.bushbeans.com/-/media/BushsBeans/MegaMenu/602-2902-Can-Original.png")
        message.channel.send("BEAN");
	},
};