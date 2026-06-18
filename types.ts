import { ChatInputCommandInteraction, Collection, SlashCommandBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => void | Promise<void>;
}

export interface Event {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => void | Promise<void>;
}

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}