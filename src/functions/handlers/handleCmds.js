const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const colours = require("../../configs/styling");
const style = require("../../configs/styling");
const fs = require("fs");

module.exports = (client) => {
  let emptyLineLogged = false; // Flag track empty line

  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        try {
          const command = require(`../../commands/${folder}/${file}`);
          if (!command || !command.data || !command.data.name) {
            console.error(
              `${style.inverse}${style.bold}${colours.orange} WARN: ${style.reset} Invalid command structure in following filepath: ${style.underline}commands / ${folder} / File: ${file}${style.reset}`
            );
            continue;
          }

          if (!emptyLineLogged) {
            console.log(""); // linebreak
            emptyLineLogged = true; //set flag true
          }

          console.log(`Setting command: ${command.data.name}`);
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
        } catch (error) {
          console.error(
            `${style.inverse}${style.bold}${colours.red} ERR: ${style.reset} Error loading command from file: ${style.underline}commands / ${folder} / ${file}${style.reset}`,
            error
          );
        }
      }
    }

    const clientId = "1193284757597999125";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log(
        `\nStarted refreshing application (/) commands...${style.reset}`
      );

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log(
        `${style.bold}${style.italicise}Successfully refreshed application (/) commands${style.reset}`
      );
    } catch (error) {
      console.error(error);
    }
  };
};
