const ExportCyrillToLatin = require("../cyrill-To-Latin/cyrill-To-Latin");
const cyrillToLatin = ExportCyrillToLatin.cyrillToLatin;

module.exports = {
  regexp: /^стата/i,
  func: async function(context) {
if (context.text === "стата"){
  context.send("укажите ник, например стата мега")
} else {

      let re = /^\w/i;
      PlayerName = context.text.replace("стата ","")
    
      let valid = re.test(PlayerName);
      if (valid) {
        context.setActivity(1),
          context.send("Ждем пока с серверов новгеймса загрузится..."),
          context.setActivity(1),
          context.sendSticker(9037),
          context.setActivity(1),
          await context.sendPhoto(
            "http://2142.novgames.ru/sig/image.php?nick=^" + PlayerName + "$"
          );
      } else {
        context.send("ников на русском нет... но я попробую догадаться"),
          await context.sendPhoto(
            "http://2142.novgames.ru/sig/image.php?nick=^" +
              cyrillToLatin(PlayerName) +
              "$"
          );
      }
    }
  },
  help: 'стата',
  desc: 'запрос статистики игрока'
};
