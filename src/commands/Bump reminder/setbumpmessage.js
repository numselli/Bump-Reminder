module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message, sharder} = itemsToImport;
        if (message.content) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"Improper syntax.", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
        if (!message.member.permission.has("administrator")) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"You must be the owner of this server or an administrator.", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));

        const guild = await sharder.query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]});
        
        if (guild.length === 0) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"Make a valid bump first", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));

        sharder.query({text: 'UPDATE guilds SET bumpmessage = $1  WHERE serverid = $2', values: [message.content, message.channel.guild.id]});
        message.channel.createMessage( {"embed": {"title": `Done`,"description":"The new reminder message for this server is: `"+message.content+"`", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Allows you to change the bump reminder message.\n```??botPrefix??setbumpmessage <YOUR_BUMP_MESSAGE>```"},
        {"name": "__Restrictions__","value": "Only an admin or the server owner can use this command"}
    ]
};