import fs from "node:fs";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import type { Command } from "./types.js";

dotenv.config({ quiet: true });

const commands: object[] = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts"));

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

for (const file of commandFiles) {
  const mod = (await import(`./commands/${file}`)) as Command;
  commands.push(mod.data.toJSON());
}

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN!);

try {
  console.log("Started removing guild application (/) commands.");

  const data = (await rest.get(
    Routes.applicationGuildCommands(clientId!, guildId!)
  )) as { id: string }[];

  const promises: Promise<unknown>[] = [];
  for (const command of data) {
    const deleteUrl = `${Routes.applicationGuildCommands(
      clientId!,
      guildId!,
    )}/${command.id}`;
    promises.push(rest.delete(deleteUrl as `/${string}`));
  }
  await Promise.all(promises);

  console.log("Successfully removed guild application (/) commands.");
} catch (error) {
  console.error(error);
}