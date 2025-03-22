// Message Handler

const { ChannelType } = require("discord.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
module.exports = {
  name: "messageCreate",
  async execute(message) {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Auto Ping Responder
    if (message.content.includes("<@979758930374819910>")) {
      await message.channel.sendTyping();
      await delay(1000);
      await message.reply({
        embeds: [
          {
            color: 0xffc916,
            title: "Need Command Help?",
            description:
              "Type `/` in the message box and select my avatar on the sidebar to check all my available commands!",
            fields: [
              {
                name: "Note",
                value: "This bot only works in the server, not in DMs!",
              },
            ],
          },
        ],
      });
    }

    // No DMs Responder
    if (message.channel.type === ChannelType.DM) {
      await message.channel.sendTyping();
      await delay(1000);
      await message.reply(
        "This bot only intends to work for r/realme, not in DMs.\nPlease use the bot in the server: https://discord.gg/5D6UPMTdjy"
      );
    }

    // Auto Moo Responder

    if (message.content.trim().toLowerCase() === "moo") {
      message.react("🐮");
    }

    // Credits to @flandolf for this (this is a joke btw, but the code supposedly works)
    // realme Spell Check Blamer Pro+ Ultra Master Edition

    // if (
    //   (message.content.includes("realmeUI") == false &&
    //     message.content.toLowerCase().includes("realmeui")) == true
    // ) {
    //   var split = message.content.toLowerCase().split(" ");
    //   var match = split.filter((element) => element.includes("realmeui"));
    //   var index = split.indexOf(match[0]);
    // } else if (
    //   (message.content.includes("realme") == false &&
    //     message.content.toLowerCase().includes("realme")) == true
    // ) {
    //   var split = message.content.toLowerCase().split(" ");
    //   var match = split.filter((element) => element.includes("realme"));
    //   var index = split.indexOf(match[0]);
    // }
  },
};
