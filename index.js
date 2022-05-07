const {Webhook} = require('simple-discord-webhooks');
const config = require('./config');
const username = 'Relay®';
const avatarUrl =
	'https://cdn.discordapp.com/attachments/860194753228439553/860535506164252702/manikin.jpg';

/**
 * # Discord Webhook Log Relay
 * #### Log With Rich Presence
 * @param {String} url Webhook Url
 */
const DiscordRelay = function (url) {
	const webhook = new Webhook(url, username, avatarUrl);

	const sendMessage = async (content = '', embeds) => {
		embeds = embeds.map((embed) => {
			return {...config.messageBases.base, ...embed};
		});
		console.log(embeds['0']);
		webhook.send(content, embeds);
	};

	const sanitizeMessage = (message) => {
		const wrappedMessage = `${message}`;

		return wrappedMessage;
	};

	const sendTemplatedMessage = async (
		template = 'base',
		{title, message, fields, ...extra}
	) => {
		return title
			? await sendMessage(null, [
					{
						...config.messageBases[template],
						title,
						description: sanitizeMessage(message),
						fields: fields
							? fields.map((field) => {
									return {
										name: field.title,
										value: sanitizeMessage(field.message),
									};
							  })
							: [],
						...extra,
					},
			  ])
			: console.log('No Message To Relay');
	};

	const sendExtendedMessage = async ({
		title,
		message,
		fields,
		image,
		author,
		timestamp,
		footer,
		color,
		url,
		thumbnail,
	}) => {
		return await sendMessage('', [
			{
				title,
				description: message,
				fields: [
					...[
						fields.map((field) => ({
							name: field.title,
							value: field.message,
							inline: field.inline,
						})),
					],
				],
				timestamp,
				author: {
					name: author.title,
					icon_url: author.image,
					url: author.url,
				},
				footer: {
					text: footer.title,
					icon_url: footer.image,
				},
				image: {
					url: image,
				},
				color,
				url,
				thumbnail: {
					url: thumbnail,
				},
			},
		]);
	};

	return Object.freeze({
		success: async (title, message, fields) =>
			await sendTemplatedMessage('success', {title, message, fields}),
		error: async (title, message, fields) =>
			await sendTemplatedMessage('error', {title, message, fields}),
		log: async (title, message, fields) =>
			await sendTemplatedMessage('log', {title, message, fields}),
		custom: async (info) => await sendTemplatedMessage('base', info),
		extended: sendExtendedMessage,
	});
};

module.exports = DiscordRelay;
