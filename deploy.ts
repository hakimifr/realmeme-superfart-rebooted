import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import type { Command } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ quiet: true });

const commands: object[] = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts"));

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const mod = (await import(pathToFileURL(filePath).href)) as Command;
  if ("data" in mod && "execute" in mod) {
    commands.push(mod.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN!);

try {
  console.log(
    `Started reloading ${commands.length} guild application (/) commands.`
  );

  const data = (await rest.put(
    Routes.applicationGuildCommands(clientId!, guildId!),
    { body: commands }
  )) as unknown[];

  console.log(
    `Successfully reloaded ${data.length} guild application (/) commands.`
  );
} catch (error) {
  console.error(error);
}