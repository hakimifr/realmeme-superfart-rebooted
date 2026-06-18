import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder().setName("bestrom").setDescription("THERE IS NO BEST ROM OMFG STOP");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({
    embeds: [
      {
        color: 0xffc916,
        title: "Best ROM",
        description: "___**There is no such best ROM.**___",
        fields: [
          {
            name: "Why?",
            value: "Different people have different preferences. What may be the best for you may not be the best for others.",
          },
          {
            name: "What? ",
            value: "The real best ROM is the one which you enjoy using the most, find the most stable, and has the features you want to use.",
          },
        ],
      },
    ],
  });
}