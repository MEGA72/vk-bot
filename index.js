const { VK } = require("vk-io");
const vk = new VK({ token: process.env.TOKEN });
const config = require("./config/config");
vk.token = config.token;
const fs = require("fs");
const Gamedig = require("gamedig");
const geo = require("./src/commands/geo.js")

//поиск команд в папке
const cmds = fs
  .readdirSync(`./src/commands/`)
  .filter(name => /\.js$/i.test(name))
  .map(name => require(`./src/commands/${name}`));

vk.updates.on(["new_message"], async context => {
  //логируем id и текст, не логируются прекрепления и пересылаемые сообщения
  console.log(` ${context.senderId} => ${context.text}`);

  //проверка на пересылаемые сообщения
  if (context.forwards.flatten.length > 0) {
    context.send("не работаю с пересылаемыми сообщениями");
    return;
  }
  if (context.senderId < 1 || context.isOutbox) {
    return;
  }

  //проверяем есть ли гео привязка
  if (context.hasGeo) {
    let name = await vk.api.users.get({
      user_id: context.senderId, fields: "photo_100"
    });

    // context.send(`
    // данные пользователя для карт
    // photo_200_orig - ${name[0].photo_200_orig}
    // first_name - ${name[0].first_name}
    // last_name - ${name[0].last_name}
    // senderId - ${context.senderId}
    // latitude - ${context.geo.coordinates.latitude}
    // longitude - ${context.geo.coordinates.longitude}
    // `);

    

    try {
      await geo.func(context,context.senderId,context.geo.coordinates.latitude,context.geo.coordinates.longitude,name[0].first_name,name[0].last_name,name[0].photo_100);
    } catch (e) {
      console.log(`Ошибка:\n${e}`);
      context.send(`Ошибка при выполнении команды '${context.text}'`);

    }

return;
  }


  //проверка на прикрепленные файлы
  if (context.attachments.length > 0) {
    if (context.attachments[0].type === "sticker") {
      context.send("не работаю со стикерами");
      return;
    } else {
      context.send("не работаю с прикрепленными файлами");
      return;
    }
  }

  //Изменяет статус набора текста пользователем в диалоге.
  context.setActivity();

  // поиск команд в файлах
  let cmd = cmds.find(cmd =>
    cmd.regexp
      ? cmd.regexp.test(context.text)
      : new RegExp(`^\\s*(${cmd.tag.join("|")})`, "i").test(context.text)
  );
  if (!cmd) return context.send("Команда не найдена");

  //попытка отправки
  try {
    await cmd.func(context, { cmds, vk, VK, cmd, Gamedig });
  } catch (e) {
    console.log(`Ошибка:\n${e}`);
    context.send(`Ошибка при выполнении команды '${context.text}'`);
  }
});

// запуск
vk.updates.start(console.log("bot up")).catch(console.error);