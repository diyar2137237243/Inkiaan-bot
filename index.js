const WOKCommands = require('wokcommands')
const fetch = require('node-fetch');
const db = require('quick.db')
const math = require('mathjs');
const Discord = require('discord.js');
const DiscordJS = require('discord.js');
const path = require('path')

const { Intents } = DiscordJS

const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})


client.on("message", message => {
if(db.has(message.author.id + '+afk')) {
    message.channel.send(`Welcome back ${message.author}`)
    db.delete(message.author.id + '+afk')
    db.delete(message.author.id + '+messageafk')
    }
    if (message.content.startsWith('+afk')) {
    message.channel.send('Alright, I have set your AFK. I will send a message to the users who mention you..')
    // then here you use the database :
    db.set(message.author.id + '+afk','true')
    db.set(message.author.id + '+messageafk', message.content.split(' ').slice(2))
    }
    if (message.content.includes('+afk off')) {
    db.delete(message.author.id + '+afk')
    db.delete(message.author.id + '+messageafk')
    }
    // If one of the mentions is the user
    message.mentions.users.forEach(user =>{
    if (message.author.bot) return false;
   
    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
    if(db.has(user.id + 'i!afk')) message.channel.send(`${message.author}, the user you mentioned is currently AFK.. Leave a message if urgent by DMing him`)})})

    client.on('ready', () => {
        new WOKCommands(client, {
          // The name of the local folder for your command files
          commandsDir: path.join(__dirname, 'commands'),
          // What guilds your slash commands will be created in
          testServers: ['870652574771052594']
        })
      })

client.on("guildMemberAdd", member => {
    const myServer = "806647760907927552"; 
    const welcomeChannel = "922940236793786438";
     if(member.guild.id === myServer) {
     client.channels.cache.get(welcomeChannel).send(`Hey ${member.user}!
     Welcome to The Inkiana Subscriber Server! You are member number ${member.guild.memberCount}! Please read the rules in <#922940071374639124>. If you're lost feel free to ask people in different channels or make a ticket. If you want Bee Swarm Macros to check <#922941247851757708>. Have fun and don't forget to Subscribe to Inkiana!`)
     }
    })


    client.on("message", (message => {
    if (message.content === "+ping") {
        let embed = new Discord.MessageEmbed()
        .setTitle("🏓 Pong!")
        .setDescription(`**${client.ws.ping}ms** Latency!`)
        .setColor("RED")
        .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL()
        );
        message.channel.send(embed);
        }
        client.on('ready', () => {
            client.user.setActivity('+info', { type: 'PLAYING' })
           })

            if(message.content === "+info") {
                let embed = new Discord.MessageEmbed()
                .setTitle("Info Section")
                .setDescription("**For commands please type +cmds in <#923365608618352670>!**\n **Rules <#922940071374639124>**\n **Discord Invite** https://discord.gg/8z83nmBtcC")
                .setColor("RANDOM")
                .setFooter("If there is a problem with the bot please ping/dm the owner of the bot. (Thonk!#5327)")
                message.channel.send(embed)
               }

               if (message.content.toLowerCase().startsWith('+kick')) {
                const member = message.mentions.members.first()
                if (!member) return message.channel.send('You need to mention a user/provide an ID')
                if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send('You lack the required permissions')
                if (member.permissions.has('KICK_MEMBERS') || member.permissions.has('BAN_MEMBERS')) return message.channel.send('This user seems to be a moderator')
               
                try {
                    member.send("You have been kicked from the Inkiana Subscriber server!")
                member.kick().then(() => {
                message.channel.send(`Kicked ${member}`)
                })
                } catch (err) {
                console.log(err)
                message.channel.send('Oops, something went wrong ')
                }}

                if(message.content.startsWith("+dm")) {
                    const whattosend = message.content.slice("".length).trim().split(/ +/);
                   whattosend.shift().toLowerCase().split(" ")[1]
                   const member = message.mentions.members.first() || message.guild.members.cache.get(whattosend[0])
                   if(!member) return message.channel.send('Provide a user!')
                   if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send('You lack the required permissions')
                   if(!whattosend[1]) return message.channel.send('What do you want to send to them?')
                   member.send(whattosend.slice(1).join(" "))
                   }
                   if(message.content === "+cmds") {
                    let embed = new Discord.MessageEmbed()
                     .setTitle("Commands")
                     .addField("MODERATION", "`+kick\n usage: +kick <user/id>` ")
                     .addField("UTILITY", " `+say usage: +say <whatever you want the bot to say>` `+ping` `+info` `+calc usage: +calc <math question> +dm usage: +dm <@user> <message> +afk`")
                     .addField("FUN", " `+howgay usage: +howgay <@user>` `8ball usage: +8ball <question here>` `+kill usage: +kill <@user>` `+revive usage: +revive <@user>`")
                     .setFooter(`Requested by ${message.author.tag}`)
                     .setTimestamp()
                     .setFooter(`Requested by ${message.author.tag}`)
                     message.channel.send(embed)

                   }
                       if (message.content.toLowerCase().startsWith("+howgay")) {
                        let gayrate = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59","60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]
                        let victim = message.mentions.users.first()
                        if (!victim) message.reply ("Mention someone!")
                        else {
                        message.lineReplyNoMention
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`Howgay Machine`)
                        .setDescription((`${victim} is ${gayrate[Math.floor(Math.random() * gayrate.length)]}% gay!`))
                        .setFooter("howgay")
                        .setColor("RANDOM")
                        .setTimestamp()
                        message.channel.send(embed)
                        }
                        }
                        if(message.content === "+8binfo") {
                            let embed = new Discord.MessageEmbed()
                            .setTitle("8ball Info")
                            .setDescription("`+8ball` is to start 8ball.\nPlease dont message like this: `+8ball` or `+8ball yeeee` that will just mess things up bro\nUse a sentence that works with a question mark\nThats all. Now start using 8ball.")
                            message.channel.send(embed) ///the usage of 8ball
                            }
                            if(message.content.startsWith("+8ball")) {
                            let replies = ["Yes.", "No.", "Could happen.", "Maybe.", "Totally.", "Signs lead to no.", "Signs lead to yes.", "Yes. Wait no. Ummm...No.", "Reply hazy. Try again.", "Get a brain fool.", "c://no", "c://yes", "Sure.", "Why not?", "No way that is possible.", "Definitely not.", "Without a doubt.", "Heck nah" ] ///if you want you can add more ways to reply
                            let embed = new Discord.MessageEmbed()
                            .setTitle("8ball's Answer")
                            .setDescription(`8ball's Answer: ${replies[Math.floor(Math.random() * replies.length)]}`)
                            .setColor("RED")
                            .setFooter("8ball has given you an answer")
                            message.channel.send(embed)
                            }
                            if(message.content.toLowerCase().startsWith("+calc")) {
                                const args = message.content.split(" ").slice(1)
                                if(!args[0]) return message.channel.send('enter ur maths text question ;-;');
                                let resp;
                                try {
                                resp = math.evaluate(args.join(" "))
                                } catch (e) {
                                return message.channel.send('Please provide a **valid** question')
                                }
                                const embed = new Discord.MessageEmbed()
                                .setColor("random")
                                .setTitle('Calculator')
                                .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
                                .addField('Answer', `\`\`\`css\n${resp}\`\`\``)
                                message.channel.send(embed);
                                }
                        

                                if (message.content.startsWith("+say")) {
                                    if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send('You lack the required permissions')
                                    let sentence = message.content.split(" ");
                                    sentence.shift();
                                    sentence = sentence.join(" ");
                                    if (!sentence) message.reply("WHAT DO YOU WANT ME TO SAY?")
                                    message.delete();
                                    if (sentence.startsWith("+")) {
                                    message.reply("Are you trying to execute a command thru me? Manipulating an innocent bot?? :'( . Welp you can't")
                                    console.log(message.author.username + " said :- " + sentence)
                                    return;
                                    }
                                   
                                
                                    if (sentence != "+say" || "") {
                                    message.channel.send(sentence);
                                    }
                                    console.log(message.author.username + " said :- " + sentence)
                                    }
                                   if(message.content === "ping") {
                                    message.channel.send('pong')
                                }
                             
                                   if(message.content === "-_-") {
                                    message.channel.send(':expressionless:')
                                }

                                    if(message.content === ":face_with_raised_eyebrow:") {
                                        message.channel.send(':troll:')
                                    }

                                    if(message.content === "sus") {
                                        message.channel.send('https://tenor.com/view/sus-suspicious-gif-23068645')
                                    }
                                    if(message.content.startsWith("+kill")) {
                                        let victim = message.mentions.users.first()
                                        if(!victim) message.reply("Mention someone to Kill")
                                        else{
                                       let replies = [ (`${victim} has been shot`), (`${victim} has been stabbed`), (`${victim} has been drowned`), 
                                        (`${victim} has been electrified`), (`A goose honked at ${victim} to death`), 
                                        (`Some psychopath zapped ${victim} with his laser eyes`), 
                                        (`${victim} ate a poisonous potato`), (`${victim} died from slowmode being to long`), 
                                        (`${victim} was run over by car`), (`${victim} died of cuteness`), (`${victim} was pushed in lava`), (`${victim} was banned by the server owner`), 
                                        (`${victim} was found dead in a dumpster`), 
                                        (`Someone named Joe was found chewing on ${victim}'s leg`), (`${victim} got drunk and fell in the water`), 
                                        (`${victim} made a deal with the devil`), (`${victim} was hacked by an Oreo`), (`An alien named MEE6 abducted ${victim} in their sleep`),]
                                       
                                        message.channel.send(`${replies[Math.floor(Math.random() * replies.length)]}`) 
                                        try {
                                            message.reply("You can only execute commands in <#923365608618352670>!")
                                          } catch (err) {
                                          console.error(err)
                                          }
                                        }
                                        }   
                                        
                                        if(message.content.startsWith("+revive")) {
                                            let victim = message.mentions.users.first()
                                            if(!victim) message.reply("Mention someone to Revive")
                                            else{
                                           let replies = [ (`${victim} got a second chance`), (`${victim} has been revived`), (`${victim} has been revived via the fortnite van`), 
                                            (`A goose honked at ${victim} to life`), 
                                            (`Someone gave ${victim} a 19 dollar fortnite card`), 
                                            (`${victim} ate a poisonous potatoin heavon.. which revived him`), (`${victim} was given a second chance`), 
                                            (`${victim} was pushed in water`), (`${victim} was unbanned by the server owner`),  
                                            (`${victim} turned on creative mode`), 
                                            (`${victim} made a deal with allah/god`), (`${victim} was hacked by an 
                                           Oreo.. which brought him back to life`)]
                                           
                                            message.channel.send(`${replies[Math.floor(Math.random() * replies.length)]}`) 
                                            try {
                                                message.reply("You can only execute commands in <#923365608618352670>!")
                                              } catch (err) {
                                              console.error(err)
                                              }
                                            }
                                            }  
                                            if(message.content.startsWith("+purge")){
                                                let arg = message.content.split(" ")
                                                if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You lack the required permissions!"); {
                                                let clear = arg[1];
                                                if(!clear) return message.channel.send(`:x: | \`Incorrect usage of command you need to provide an amount of messages to Clear.\` 
                                                **Example:** \`+purge 50\` `)
                                                if(isNaN(clear)) return message.channel.send(":x: | ``Please Put a Valid Number to Clear messages.``")
                                                if(clear > 100) return message.channel.send(":x: | ``I can't Clear more than 100 messages.``")
                                                if(clear < 1) return message.channel.send(":x: | ``You cannot Clear less than 1 message.``")
                                                
                                                message.channel.bulkDelete(clear)
                                                message.channel.send(`:white_check_mark: | \`Succesfully cleared ${clear} messages! | If purge fails please make sure I have MANAGE_MESSAGES to make the purge seccessful.\` `)
                                                .then(message => 
                                                 message.delete({timeout: 10000})
                                                 )
                                                }
                                                }
                
                    
                    
                    
                                    }));
                    client.on('ready', () => {
                        client.user.setActivity('Bot in beta! || https://discord.gg/8z83nmBtcC', { type: 'PLAYING' })
                       })




client.login('OTE0ODgyMzkzMTA0NjEzMzc2.YaTgoA.yUL9KrTt8Z5oCG5TeAKLu1Uqoeg');