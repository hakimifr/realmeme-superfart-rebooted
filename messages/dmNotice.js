// DM Notice Handler

const { ChannelType } = require("discord.js");

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  exclusive: true,

  match(message) {
    return message.channel.type === ChannelType.DM;
  },

  async execute(message) {
    await message.channel.sendTyping();
    await delay(1000);

    await message.reply(
      "This bot only intends to work for r/realme, not in DMs.\nPlease use the bot in the server: https://discord.gg/5D6UPMTdjy",
    );
  },
};