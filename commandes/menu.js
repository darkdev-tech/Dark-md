const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = (s.MODE.toLowerCase() === "yes") ? "PUBLIC" : "PRIVATE";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
┃ ━━━☢︎︎*☆ 𝗗𝗔𝗥𝗞 𝗠𝗗 ☆*☢︎︎━━━❍
┃❍╭──────────────߷
┃❍│▸  *ᴅᴀᴛᴇ*: ${date}
┃❍│▸  *ᴛɪᴍᴇ ɴᴏᴡ*: ${temps}
┃❍│▸  *ᴘʀᴇғɪx* : [  ${s.PREFIXE}  ]
┃❍┃▸  *ᴍᴏᴅᴇ* :  ${mode} mode
┃❍┃▸  *ᴘʟᴜɢɪɴs* : ${cm.length}
┃❍│▸  *ʀᴜɴɴɪɴɢ ᴏɴ* : ${os.platform()}
┃❍│▸  *ᴏᴡɴᴇʀ* :  ${s.OWNER_NAME}
┃❍│▸  *ᴅᴇᴠᴇʟᴏᴘᴇʀ* : ᴅᴀʀᴋ ᴛᴇᴄʜ ᴏᴡɴᴇʀ
┃❍│▸  *ᴛɪᴍᴇᴢᴏɴᴇ* : ${s.TZ}
┃❍╰───────────────߷
╰━━━━━━━━━━━━━━━❍
☆𝗗𝗔𝗥𝗞-𝗨𝗖𝗘𝗬 𝗧𝗘𝗖𝗛 𝗕𝗢𝗧☆\n${readmore}`;
    
 
    let menuMsg=`  
  *𝐃𝐀𝐑𝐊 𝐌𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
`;

    for (const cat in coms) {
        menuMsg += `*╭────❂* *${cat}* *❂*`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*┊☆* ${cmd}`;
        }
        menuMsg += `
*╰═════════════❂* \n`
    }

    menuMsg += `
◇            ◇
*—————☆☆☆☆—————*

  *𝙳𝙰𝚁𝙺 -ᴍᴅ - ᴅᴇᴠᴇʟᴏᴘᴇᴅ ʙʏ 𝙳𝙰𝚁𝙺 𝚃𝙴𝙲𝙷!* ✨`;
*                                         
*╰═════════════❂*

    let imageUrl = "https://i.ibb.co/7PqQV1p/images-34.jpg";

    try {
        zk.sendMessage(dest, { 
            image: { url: imageUrl }, 
            caption: infoMsg + menuMsg, 
            footer: "© 𝙳𝙰𝚁𝙺-𝙼𝙳" 
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵 Menu error: " + e);
        repondre("🥵 Menu error: " + e);
    }
});
