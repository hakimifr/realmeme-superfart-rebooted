import { ActivityType, Client } from "discord.js";

export const name = "ready";
export const once = true;

export function execute(client: Client<true>) {
  console.log("Ready to serve!");

  client.user.setPresence({
    activities: [
      {
        name: "hi i just woke up",
        type: ActivityType.Custom,
      },
    ],
  });

  setInterval(() => {
    const statuses = [
      { type: ActivityType.Playing, text: "with my pp" },
      { type: ActivityType.Playing, text: "with the bEsT rOm" },
      { type: ActivityType.Playing, text: "uno reverse cards" },
      { type: ActivityType.Playing, text: "with bricked devices" },
      { type: ActivityType.Listening, text: "stopify" },
      { type: ActivityType.Listening, text: "yt music free" },
      { type: ActivityType.Watching, text: "for idiots" },
      { type: ActivityType.Watching, text: "reddit memes" },
      { type: ActivityType.Watching, text: "for new ROMs" },
      { type: ActivityType.Watching, text: "for bugfixes" },
      { type: ActivityType.Watching, text: "for sir plz sir" },
      { type: ActivityType.Watching, text: "you brick phones" },
      { type: ActivityType.Watching, text: "people double ping" },
      { type: ActivityType.Watching, text: "people not follow the guide" },
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    client.user.setPresence({
      activities: [
        {
          name: randomStatus.text,
          type: randomStatus.type,
        },
      ],
    });

    console.log("Status changed!");
  }, 1800000);
}