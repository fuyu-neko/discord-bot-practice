const Discord = require("discord.js");
const config = require(`./config`);


const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});

module.exports = client;

client.on( "ready", () => {
    console.log(`Logged in as ${client.user.tag}.`);
});

const cogs = [
    require(`./commands/Stats`),
];


cogs.forEach(({ name, handler }) => client.on(name, handler));


client.login(config.token);