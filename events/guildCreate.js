// Guild Create Event Handler

const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    // Always leave any guilds that are not the authorized guild
    if (guild.id !== process.env.GUILD_ID) {
      console.log(`Leaving unauthorized guild: ${guild.name} (${guild.id})`);
      await guild.leave();
    }
  },
};
