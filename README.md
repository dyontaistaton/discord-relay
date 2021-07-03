# Discord Relay<sup>®
Relay logs to discord through webhooks in style
 
### Install
```
$ npm install discord-relay --save
```
 
### Usage
```js
const DiscordRelay = require('discord-relay');

const webhook = DiscordRelay('WEBHOOK URL');

//* Sends stylied message through discord webhook
webhook.success('Test has passed', 'more info on the topic');
webhook.error('Test has failed!','error message',[{
   title: 'Field #1 Title',
   message: "Corresponding Message"
}]);
```
