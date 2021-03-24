const Discord = require("discord.js"),
	client = new Discord.Client(),
	config = require("./config.json"),
	ytdl = require("ytdl-core"),
	streamOptions = { seek: 0, volume: 1 };

client.on("ready", () => {
	console.log(
		`O bot foi iniciado, com ${client.users.cache.size} usuários e em ${client.guilds.cache.size} servidores.`
	);
	client.user.setActivity("Macaquisses", { type: "LISTENING" });
	`Eu estou em ${client.guilds.cache.size} servidores`;
});

// client.on("guildCreate", (guild) => {
// 	console.log(
// 		`O bot entrou no servidor: ${guild.name} (ID do servidor: ${guild.id}). Membros: ${guild.memberCount} membros!`
// 	);
// 	client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`);
// });

// client.on("guildDelete", (guild) => {
// 	console.log(
// 		`O bot foi removido do servidor: ${guild.name} (ID do servidor: ${guild.id})`
// 	);
// 	client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
// });

client.on("message", async (message) => {
	if (message.author.bot || message.channel.type === "dm") return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g),
		comando = args.shift().toLowerCase();

	if (comando === "ping") {
		const m = await message.channel.send("Pinga-lo-ei!");
		m.edit(
			`OooOoOh! A latência é ${
				m.createdTimestamp - message.createdTimestamp
			}ms. A latência da API é ${Math.round(client.ws.ping)}ms.`
		);
	} else if (comando === "play") {
		let VChannel = message.guild.channels.cache.find((x) => {
			return x.id == "824186376832286731";
		});

		console.log(args);

		if (VChannel !== null) {
			VChannel.join()
				.then((connection) => {
					const stream = ytdl(args[0], {
							filter: "audioonly",
						}),
						DJ = connection.play(stream, streamOptions);
					DJ.on("end", (end) => {
						VChannel.leave();
					});
				})
				.catch(console.error);
		}
	}
});

client.login(config.token);
