// Auto Reaction Handler

const reactions = {
  moo: "🐮",
  woof: "🐶",
  meow: "🐱",
};

module.exports = {
  match(message) {
    return Object.hasOwn(
      reactions,
      message.content.trim().toLowerCase(),
    );
  },

  async execute(message) {
    const keyword = message.content.trim().toLowerCase();

    await message.react(reactions[keyword]);
  },
};