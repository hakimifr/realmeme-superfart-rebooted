import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({
    embeds: [
      {
        color: 0xffc916,
        title: "Ping?",
        description: "Pong!",
      },
    ],
  });
}