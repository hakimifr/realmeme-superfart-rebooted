import { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("reload")
  .setDescription("Restarts the bot! (Bot developer exclusive)")
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const { client } = interaction;
  console.log(interaction.user.id);
  if (interaction.user.id !== process.env.OWNER_ID)
    return interaction.reply({
      embeds: [
        {
          color: 0xffc916,
          title: "Bot Reloader",
          description: "Only the bot developer can perform this action!",
        },
      ],
      flags: MessageFlags.Ephemeral,
    });
  await interaction.reply({
    embeds: [
      {
        color: 0xffc916,
        title: "Bot Reloader",
        description: "Bot is now reloading.",
      },
    ],
    flags: MessageFlags.Ephemeral,
  });
  await client.destroy();
  return process.exit(0);
}