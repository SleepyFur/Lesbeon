// Require the necessary classes
require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = process.env;
const fs = require("fs");
const { magenta } = require ('ansicolor')
const { generateDependencyReport } = require("@discordjs/voice");
const { DisTube, StreamType } = require("distube");
const { DeezerPlugin } = require("@distube/deezer");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const config = require("./configs/data");

// Function to print ASCII text art banner
function printBanner(version) {
  const pinkBrightColor = magenta.bright;

  console.log(pinkBrightColor('     ██╗     ███████╗███████╗██████╗ ███████╗ ██████╗ ███╗   ██╗     ' + version.charAt(0)));
  console.log(pinkBrightColor('     ██║     ██╔════╝██╔════╝██╔══██╗██╔════╝██╔═══██╗████╗  ██║     ' + version.charAt(1)));
  console.log(pinkBrightColor('     ██║     █████╗  ███████╗██████╔╝█████╗  ██║   ██║██╔██╗ ██║     ' + version.charAt(2)));
  console.log(pinkBrightColor('     ██║     ██╔══╝  ╚════██║██╔══██╗██╔══╝  ██║   ██║██║╚██╗██║     ' + version.charAt(3)));
  console.log(pinkBrightColor('     ███████╗███████╗███████║██████╔╝███████╗╚██████╔╝██║ ╚████║     ' + version.charAt(4)));
  console.log(pinkBrightColor('     ╚══════╝╚══════╝╚══════╝╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝     '));
}

// Ver
const version = "V 1.0";
printBanner(version);

// Detect operation time and output it to terminal
var StartTime = new Date();
var date = StartTime.getDate()+'-'+(StartTime.getMonth()+1)+'-'+StartTime.getFullYear();
var time = StartTime.getHours() + ":" + StartTime.getMinutes();
var dateTime = date+' '+time;
console.log(`\n\nStart Time: ${dateTime}\n`);

// Create client instance
const client = new Client({
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: true,
  },
  presence: {
    status: "dnd",
  },
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ],
});

// Configure in client
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.contexts = new Collection();
client.commandArray = [];

// Access functions folder to retrieve handlers
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const handlerFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of handlerFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);