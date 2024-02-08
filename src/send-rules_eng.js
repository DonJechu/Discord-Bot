require('dotenv').config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', async () => {
  try {
    const channel = await client.channels.cache.get('1057405107257475134'); // Reemplaza con tu ID de canal real.
    if (!channel) return;

    // Crea varios embeds basados en tu JSON.
    const embeds = [
      new EmbedBuilder()
        .setColor(14177364)
        .setImage("https://i.gyazo.com/83f1488521becb3b9a1fe81a1dea8cd5.png"),

      new EmbedBuilder()
        .setTitle("<:ruby:1057416000523472966> **WELCOME TO OUR COMMUNITY**")
        .setDescription("Welcome to RBY Events Minecraft Development Team's official Discord server! We're thrilled to have you with us on this creative journey.")
        .setColor(14177364),

      new EmbedBuilder()
        .setColor(14177364)
        .setImage("https://i.gyazo.com/8655097f72db77231e40aa5e2f52d452.png"),

      new EmbedBuilder()
        .setDescription("Maintaining order in our community is crucial, so it's important that we all act accordingly and, above all, respect the rules that allow us to interact here. First and foremost, please familiarize yourself with [Discord's Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines).\n\n:scroll: **`SHOWING RESPECT`**\nTo foster a positive environment, let's treat each other with kindness and respect. This includes being courteous to our team members and following their guidance.\n\n:scroll: **`KEEP IT FAMILY-FRIENDLY`**\nSince we aim to maintain a family-friendly atmosphere, let's ensure our discussions and interactions align with this principle. Let's steer clear of using language or content that may not be suitable for all ages.\n\n:scroll: **`OFFENSIVE DISCUSSIONS`**\nTo ensure everyone feels comfortable, let's avoid engaging in offensive or contentious topics. This space is dedicated to all things Minecraft, so let's keep our discussions focused on that wonderful world.\n\n:scroll: **`SPAM & PROMOTION`**\nTo maintain a structured and enjoyable experience, let's refrain from excessive use of caps, repetitive messages, or promoting external communities. Let's keep the conversation engaging and meaningful.\n\n:scroll: **`PRACTICE ONLINE ETIQUETTE`**\nJust like in any other professional setting, let's use common sense and be considerate when interacting with fellow members.\n\n:scroll: **`ACCOUNTABILITY`**\nAs a community, we all share in the responsibility of ensuring a positive experience for everyone. If you come across any behavior that doesn't align with our values, please don't hesitate to reach out to our team.")
        .setColor(14177364)
        .setFooter({ text: 'Last update: 11/06/2023'})
    ];

    // Envía los embeds en un solo mensaje.
    await channel.send({ embeds: embeds });

    console.log('Community welcome embeds sent successfully.');
  } catch (error) {
    console.error('Error sending the community welcome embeds:', error);
  }
});

client.login(process.env.TOKEN);
