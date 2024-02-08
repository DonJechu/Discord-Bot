require('dotenv').config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder // Importamos EmbedBuilder para los mensajes embed.
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: '1171209584053076008',
    label: 'They/Them',
    emoji: '🟣' // Emoji para el botón.
  },
  {
    id: '1171209618173743116',
    label: 'She/Her',
    emoji: '🟠'
  },
  {
    id: '1171209654680956999',
    label: 'He/Him',
    emoji: '🟢'
  },
];

client.on('ready', async () => {
  try {
    const channel = await client.channels.cache.get('1171186231451844659'); 
    if (!channel) return;

    const row = new ActionRowBuilder();
    roles.forEach((role) => {
      const button = new ButtonBuilder()
        .setCustomId(role.id)
        .setLabel(role.label)
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(role.emoji); // Añade el emoji al botón.
      row.addComponents(button);
    });

    const embed = new EmbedBuilder()
      .setColor(0x00AE86) // Un color verde suave.
      .setTitle('What are your pronouns?')
      .setDescription("Hey! 👋 Click the button that matches your pronouns. It's a small click for you, but a big leap for our respectful and caring community.")
      .setFooter({ text: 'Comfortable. Respectful. You.' });

    await channel.send({
      embeds: [embed],
      components: [row]
    });

    console.log('Message with pronoun roles sent successfully.');
  } catch (error) {
    console.error('Error sending the pronoun roles message:', error);
  }
});

client.login(process.env.TOKEN);
