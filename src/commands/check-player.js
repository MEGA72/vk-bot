module.exports = {
  regexp: /^проверять/i,
  func: async function(context,{ vk }) {
    if (context.text === "проверять") {
      context.send(`для проверки надо послать команду
  проверять НИК
  важно, ник должен совпадать с игровым, например:
  проверять mega`);
    } else {
      PlayerName = context.text.replace("проверять ", "");
      let arr = [];
      let timeForTimeout = 1000;
      let name = await vk.api.users.get({
        user_id: context.senderId
      });
      name = name[0].first_name;
      context.send(
        `Уважаемый ${name} я буду проверять каждые 5 минут \n когда появится ${PlayerName}`
      );
      setTimeout(function run() {
        const Gamedig = require("gamedig");
        let PortServer = [29987, 30089, 29024, 30090, 29301];
        PortServer.forEach(element => {
          let host = "188.246.224.35";
          if (element == "29301") {
            host = "82.151.200.106";
          }
          Gamedig.query({
            type: "bf2142",
            host: host,
            port: element
          }).then(state => {
            for (let i = 0; i < state.players.length; i++) {
              state.players[i].name = state.players[i].name.split(" ")[1];
              arr.push(state.players[i].name);
            }
          });
        });
        console.log(arr.includes(PlayerName));
        if (arr.includes(PlayerName)) {
          Data = new Date();
          context.send(
            `Уважаемый ${name} уведомляю что ${PlayerName} замечен в игре примерно в ${Data}`
          ),
            clearTimeout(run);
        } else {
          console.log("он не онлайн --> " + PlayerName);
          setTimeout(run, timeForTimeout);
          timeForTimeout = 10000;
        }
      });
    }
  },
  help: "проверять",
  desc: "следить за тем когда игрок появится на серверах"
};
