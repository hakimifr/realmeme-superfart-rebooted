import { Events, MessageFlags, Interaction } from "discord.js";

declare const dmNotice: any;

export const name = Events.InteractionCreate;

export async function execute(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!interaction.guild) {
    interaction.reply({ embeds: [dmNotice] });
  }
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.isRepliable()) {
      await interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "Error Occurred",
            description:
              "There was an error while executing this command!\n```" +
              error +
              "```",
          },
        ],
        content: "",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}