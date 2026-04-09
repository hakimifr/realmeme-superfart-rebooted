// Message Handler

const { ChannelType, Events } = require("discord.js");
const { GoogleGenAI, ThinkingLevel } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY,
  apiVersion: "v1beta",
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Auto Ping Responder
    if (message.mentions.has(process.env.CLIENT_ID)) {
      const question = message.content
        .replace(new RegExp(`<@!?${process.env.CLIENT_ID}>`, "g"), "")
        .trim();

      if (!question) {
        await message.channel.sendTyping();
        await delay(1000);
        await message.reply({
          embeds: [
            {
              color: 0xffc916,
              title: "Need Command Help?",
              description:
                "Type `/` in the message box and select my avatar on the sidebar to check all my available commands!",
              fields: [
                {
                  name: "Pro Tip",
                  value:
                    "Ping the bot with a question for a quick answer from the AI!",
                },
                {
                  name: "Note",
                  value: "This bot only works in the server, not in DMs!",
                },
              ],
            },
          ],
        });
      } else {
        await message.channel.sendTyping();
        const response = await ai.models.generateContent({
          model: "gemma-4-26b-a4b-it",
          contents: [{ role: "user", parts: [{ text: question }] }],
          config: {
            systemInstruction: `You are a tech-savvy, relaxed community member in a Discord server. Your expertise is device tweaking (Android/iOS, ADB, Root, Custom ROMs, Magisk, etc.), but you are an all-purpose tech enthusiast capable of chatting about any topic.
        
                Tone and Personality:
                - Normal Human: Talk like a regular person. Avoid "AI assistant" fluff (e.g., "I'm happy to help" or "As an AI model..."). Be chill and direct.
                - Discord Energy: Keep answers concise and straight to the point. No yapping or unnecessary essays.        
                - Handling Humor: This server jokes a lot. If a prompt is a joke or technically "edgy" but clearly trolling, don't give a moral lecture. Take it casually and play along with a witty or blunt response.
                - Identity: If asked who you are, provide a specific and honest self-introduction. You are Gemma 4 26B A4B IT, an open-weights AI model developed by Google. Do not just say "I am an AI"; be precise about your version and origin.
        
                Technical Guidelines:
                - Straight to the Point: For technical help, provide the solution immediately. Only explain "why" or "how" if specifically asked.
                - Formatting: Use bold headers for steps. Use code blocks for shell commands or file paths.
                - No Hand-holding: Assume users have basic tech knowledge. Don't explain basic terms (like "Settings" or "USB Debugging") unless requested.
                - Lists: Use numbered lists (1. 2. 3.) for instructions instead of bullet points.
                
                General Chat Rules:
                - Don't Force It: If the conversation isn't about tech, don't pivot back to tweaking. Just talk like a normal person.
                - Punctuation: Use standard capitalization and punctuation. Don't try-hard with memes or "chat speak" (like all lowercase) unless it happens naturally.
                
                Constraints:
                - Character Limit: Responses must never exceed 1800 characters.
                - Refusals: If a request is genuinely dangerous (not a joke), give a short, blunt refusal without a lecture.`,
            tools: [{ googleSearch: {} }],
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.MINIMAL,
            },
          },
        });

        const replyText = response.text;
        const footer =
          "\n\n-# Powered by Gemma 4 26B A4B IT\n-# Gemma is AI and can make mistakes.";

        if (replyText.length > 2000) {
          await message.reply(`${replyText.substring(0, 1900)}...${footer}`);
        } else {
          await message.reply(`${replyText}${footer}`);
        }
      }
    }

    // No DMs Responder
    if (message.channel.type === ChannelType.DM) {
      await message.channel.sendTyping();
      await delay(1000);
      await message.reply(
        "This bot only intends to work for r/realme, not in DMs.\nPlease use the bot in the server: https://discord.gg/5D6UPMTdjy",
      );
    }

    // Auto Moo Responder

    if (message.content.trim().toLowerCase() === "moo") {
      message.react("🐮");
    }

    // Credits to @flandolf for this (this is a joke btw, but the code supposedly works)
    // realme Spell Check Blamer Pro+ Ultra Master Edition

    // if (
    //   (message.content.includes("realmeUI") == false &&
    //     message.content.toLowerCase().includes("realmeui")) == true
    // ) {
    //   var split = message.content.toLowerCase().split(" ");
    //   var match = split.filter((element) => element.includes("realmeui"));
    //   var index = split.indexOf(match[0]);
    // } else if (
    //   (message.content.includes("realme") == false &&
    //     message.content.toLowerCase().includes("realme")) == true
    // ) {
    //   var split = message.content.toLowerCase().split(" ");
    //   var match = split.filter((element) => element.includes("realme"));
    //   var index = split.indexOf(match[0]);
    // }
  },
};
