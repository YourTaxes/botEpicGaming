# botEpicGaming
My first Discord bot

This is my first Discord Bot. I am mostly doing this to learn javascript, and use legitimate programing.

HOW TO RUN

**IMPORTANT**
For these instructions to work, you shouldn't change the names of any files unless it says to. If you know how to do this on your own and don't need instructions,
can disregard this.

1. First, this program runs on Node.js, so you need to install that.

2. Next, you must go to the discord developer portal and create a bot and generate a token. You need to change the configTemplate.json file to be named config.json
and enter the token in the "token" field.

3. If you don't want to use the hypixel api commands, you need to delete the line in config.json that starts with "key" and go to the directory
commands/api/hypixel.js and commands/testing/hypixelkey.js.

4. If you want to use the hypixel commands, then you need to go on to the hypixel Minecraft server and use the command /api, or if you already have a key, use that
one. Then, once you have the key, you put it in the "key" value in the config.json file

5. Then, you need to use the command line to go to the directory for package.json file and run the command "npm install". This will install all of the liberies that
are required to make the program work

6. Last, you need to go the the command line and navigate to directory of the folder that the code is in, and do the command node index.js.
