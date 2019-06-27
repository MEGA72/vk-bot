const { VK } = require("vk-io");
const Gamedig = require("gamedig");

module.exports = {
  regexp: /^Все сервера$/i,
  func: async function(context) {
    let arrServer = [];
    try {
      const PortServer = [29987, 30089, 29024, 30090, 29025];
      for (let i = 0; i < PortServer.length; i++) {
        let state = await Gamedig.query({
          type: "bf2142",
          host: "188.246.224.35",
          port: PortServer[i]
        });
        let ask =
          state.name + " " + state.raw.numplayers + "/" + state.raw.maxplayers;
        arrServer.push(ask);
      }
      let state = await Gamedig.query({
        type: "bf2142",
        host: "82.151.200.106",
        port: 29301
      });
      let ask =
        state.name + " " + state.raw.numplayers + "/" + state.raw.maxplayers;
      arrServer.push(ask);
    } catch (error) {
      console.log(error);
      context.send(ErrorMessage);
    }
    arrServer = arrServer.join("\n");
    context.send(arrServer);


  },
  help: 'Все сервера',
  desc: 'список всех серверов с текущим онлайном'
};

