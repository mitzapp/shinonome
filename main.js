const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
var request = require('request');

function loadMessages() {
  var slogs = client.channels.get('596272789032402975');
  console.log("Rechargement des messages.");
  help = fs.readFileSync('help.md');
  slogs.send("Les messages ont étés rechargés.");
}

client.on("ready", () => {
  console.log('Ready!');
  prefix = "$";
  rolestaff = "BotRole";
  client.user.setActivity(prefix+`help`);
  var slogs = client.channels.get('596272789032402975');
  slogs.send('Ready! OwO');
  loadMessages();
  //replaceString(help, '$STAFFROLE', rolestaff);
});

client.on("message", async message => {
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

console.log("- - - - - - -\n"+message.author.username+" > "+message.content);

function name() {
  return message.author.username+"#"+message.author.discriminator;
}

if(message.content.indexOf(prefix) !== 0) return;

if (!message.content.startsWith(prefix) || message.author.bot) return;

if(command == "say") {
  	if(!message.member.roles.some(r=>[rolestaff].includes(r.name)))
  	return message.reply("Vous n'avez pas le rôle `"+rolestaff+"` pour utiliser cette commande!");
    
    if (args[0] == "" || args[0] == null) {
      return message.channel.send('Vous devez écrire un message !')
    }

    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    return message.channel.send(sayMessage);
}

if(command == "help") {
    return message.channel.send(help+"\n\nShinonome Nano est Open source ! https://github.com/mitzapp/shinonome");
}

if(command == "palmier") {
    request('https://shokokuki.ga/shinonome/nanoApi.php?palmier='+message.author.id, function (error, response, body) {
        return message.channel.send("Vous avez "+body+" palmier(s).");
    });
    // return message.channel.send("Vous avez 0 palmier(s).");
}

if(command == "reload") {
    if(!message.member.roles.some(r=>[rolestaff].includes(r.name)))
    return message.channel.send("Qu'essayes-tu de faire "+message.author.username+" ? Tu n'as pas le rôle requis !");
    loadMessages();
    return message.channel.send("Les fichiers de messages se sont rechargés.");
}

});
client.login("");
