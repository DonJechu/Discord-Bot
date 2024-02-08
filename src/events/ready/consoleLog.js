const { ActivityType } = require('discord.js'); // Asegúrate de importar ActivityType

module.exports = (client) => {
    console.log(`✅ ${client.user.tag} is online.`);

    function updateStatus() {
        const guild = client.guilds.cache.first();
        if (!guild) return; // Añadido chequeo de seguridad en caso de que el bot no esté en ningún servidor

        const totalMembers = guild.memberCount;

        const watchingStatus = {
            name: `over ${totalMembers} users`,
            type: ActivityType.Watching,
        };

        client.user.setActivity(watchingStatus);
    }

    updateStatus(); // Actualizamos el estado al inicio
    setInterval(updateStatus, 300000); // y luego cada 5 minutos
};
