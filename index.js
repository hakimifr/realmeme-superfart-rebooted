// Core codes

const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
});
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});

// Commands Handler

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

// Messages Handler

client.messages = new Collection();

const messagesPath = path.join(__dirname, "messages");
const messageFiles = fs
  .readdirSync(messagesPath)
  .filter((file) => file.endsWith(".js"));

for (const file of messageFiles) {
  const filePath = path.join(messagesPath, file);
  const handler = require(filePath);

  if (
    typeof handler.match === "function" &&
    typeof handler.execute === "function"
  ) {
    client.messages.set(file, handler);
  } else {
    console.warn(
      `[WARNING] The message handler at ${filePath} is missing a required "match" or "execute" function.`,
    );
  }
}

// Events Handler

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

console.log("Ready event listeners:", {
  ready: client.listenerCount("ready"),
  clientReady: client.listenerCount("clientReady"),
});

client.login(process.env.DISCORD_BOT_TOKEN);
