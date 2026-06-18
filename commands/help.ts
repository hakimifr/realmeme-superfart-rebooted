import { SlashCommandBuilder, MessageFlags, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("How to check my available commands!");

export async function execute(interaction: ChatInputCommandInteraction) {
  interaction.reply({
    embeds: [
      {
        color: 0x0ccab6,
        title: "**Need Command Help?**",
        description:
          "Type `/` in the message box and select my avatar on the sidebar to check all my available commands!",
      },
    ],
    flags: MessageFlags.Ephemeral,
  });
}