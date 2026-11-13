// Honeypot Handler

const { PermissionFlagsBits } = require("discord.js");
const rules = require("../misc/rules.json");

module.exports = {
  exclusive: true,

  match(message) {
    return (
      message.inGuild() &&
      message.channel.id === process.env.HONEYPOT_CHANNEL_ID
    );
  },

  async execute(message) {
    // Ignore members with moderation permissions
    if (
      message.member?.permissions.has(
        PermissionFlagsBits.ModerateMembers,
      )
    ) {
      return;
    }

    const details =
      "You sent a message in the honeypot channel, so we assumed you were a bot.";

    const reason = `${rules.rule4.name}: ${details}`;

    // Notify the user
    await message.author
      .send({
        embeds: [
          {
            color: 0xf04a47,
            description: `You were banned from ${message.guild.name} | ${reason}`,
          },
          {
            color: 0xffc916,
            title: rules.rule4.name,
            description: rules.rule4.description,
          },
          {
            color: 0xffc916,
            description:
              "Appeal the ban: <https://forms.gle/nUdK1PsqJx1Lwtq56>",
          },
        ],
      })
      .catch((error) => console.error(error));

    // Delete the honeypot message
    await message
      .delete()
      .catch((error) => console.error(error));

    // Ban the user
    await message.guild.members.ban(message.author.id, {
      reason,
    });

    // Send punishment log
    try {
      const logChannel = await message.client.channels.fetch(
        process.env.PUNISHMENT_LOG_CHANNEL_ID,
      );

      if (logChannel?.isSendable()) {
        await logChannel.send({
          embeds: [
            {
              color: 0xf04a47,
              title: "Punishment System",
              description: `${message.author.tag} was banned.`,
              fields: [
                {
                  name: "Rule Violated",
                  value: rules.rule4.name,
                },
                {
                  name: "Rule Description",
                  value: rules.rule4.description,
                },
                {
                  name: "Additional Details",
                  value: details,
                },
              ],
            },
          ],
        });
      }
    } catch (error) {
      console.error("Failed to send punishment log:", error);
    }

    // Clean up recent messages from the banned user
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const channels = await message.guild.channels.fetch();

    const textChannels = channels.filter(
      (channel) =>
        channel?.isTextBased() &&
        typeof channel.messages?.fetch === "function" &&
        typeof channel.bulkDelete === "function",
    );

    for (const [channelId, channel] of textChannels) {
      try {
        const fetchedMessages = await channel.messages.fetch({
          limit: 100,
        });

        const spammerMessages = fetchedMessages.filter(
          (msg) =>
            msg.author.id === message.author.id &&
            msg.createdTimestamp > oneHourAgo,
        );

        if (spammerMessages.size > 0) {
          await channel.bulkDelete(spammerMessages, true);
        }
      } catch (error) {
        console.error(
          `Failed to fetch or delete messages in channel ${channelId}:`,
          error,
        );
      }
    }
  },
};