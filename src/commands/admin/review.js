const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      // Verificar que el usuario que ejecuta el comando es un administrador
      if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      }

      // Obtener los argumentos del comando
      const roleName = interaction.options.getString('role');
      const rating = interaction.options.getInteger('rating');
      const freelancer = interaction.options.getString('freelancer');
      const clientName = interaction.options.getString('client');
      const comment = interaction.options.getString('comment');

      // Validar que se proporcionen todos los argumentos necesarios
      if (!roleName || !rating || !freelancer || !clientName || !comment) {
        return interaction.reply({ content: 'Please provide all required information.', ephemeral: true });
      }

      // Validar la calificación
      if (rating < 1 || rating > 5) {
        return interaction.reply({ content: 'Rating must be between 1 and 5.', ephemeral: true });
      }

      // Obtener el rol correspondiente al nombre proporcionado
      const role = interaction.guild.roles.cache.find((r) => r.name === roleName);

      // Obtener la hora y fecha actuales formateadas según la configuración regional del usuario
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      // Crear el mensaje embed con Footer
      const embed = {
        color: parseInt('e26957', 16), // Convertir el color hexadecimal a entero
        title: 'New Purchase Review',
        fields: [
          { name: 'Role', value: role ? `<@&${role.id}>` : roleName, inline: true },
          { name: 'Rating', value: '⭐'.repeat(rating), inline: true },
          { name: 'Freelancer', value: freelancer, inline: true },
          { name: 'Client', value: clientName, inline: true },
          { name: 'Comment', value: comment },
        ],
        footer: {
          text: 'RBY Events • ' + formattedDate, // Agregar el Emoji al inicio y la fecha actual al Footer
          icon_url: 'https://gyazo.com/0537747d07922c5fd6a82a093f05dd07.png', // Reemplazar con el enlace al emoji
        },
      };

      // Enviar el mensaje embed al canal especificado
      const channelId = '1172744382454173799'; // Reemplazar con el ID del canal
      const channel = interaction.guild.channels.cache.get(channelId);
      
      if (channel) {
        await channel.send({ embeds: [embed] });
        interaction.reply('Review sent successfully!');
      } else {
        interaction.reply('Could not find the specified channel.');
      }
    } catch (error) {
      console.error('Error executing review command:', error);
      interaction.reply('An error occurred while processing the command.');
    }
  },

  name: 'review',
  description: 'Send a review for a purchase.',
  options: [
    {
      name: 'role',
      description: 'Type of commission purchased.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'rating',
      description: 'Rating from 1 to 5.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: 'freelancer',
      description: 'Name of the freelancer.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'client',
      description: 'Name of the client.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'comment',
      description: 'Comment about the experience.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};
