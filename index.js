const {Webhook} = require('simple-discord-webhooks')
const config = require('./config');
const username = "Relay®"
const avatarUrl = "https://cdn.discordapp.com/attachments/860194753228439553/860535506164252702/manikin.jpg"

/**
 * # Discord Webhook Log Relay
 * #### Log With Rich Presence
 * @param {String} url Webhook Url
 */
const DiscordRelay = function(url){ 

  const webhook = new Webhook(url,username,avatarUrl)
  
  const sendMessage = async (content = '', embeds) => { 
    embeds = embeds.map(embed=>{return {...config.messageBases.base, ...embed}});
    console.log(embeds["0"])
    webhook.send(content,embeds);
  }

  const sanitizeMessage = (message) => {
    const wrappedMessage = `\`\`\`js\n${message}\`\`\``

    return wrappedMessage;
  } 
  
  const sendTemplatedMessage = async (template = 'base', {title,message,fields}) => {
    return title?await sendMessage(null,[{
      ...config.messageBases[template],
      title,
      description: sanitizeMessage(message),
      fields: fields?fields.map(field=>{return {
        name: field.title,
        value: sanitizeMessage(field.message)
      }}):[]
    }]):console.log('No Message To Relay')
  } 

  return Object.freeze({
    success: async (title, message, fields) => await sendTemplatedMessage('success',{title,message,fields}),
    error: async (title, message, fields) => await sendTemplatedMessage('error',{title,message,fields})
  })
}

module.exports = DiscordRelay;