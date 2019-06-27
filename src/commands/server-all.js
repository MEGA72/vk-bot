const Gamedig = require("gamedig");
var config = require('../../config/servers.json');

module.exports = {
  regexp: /^Все сервера$/i,
  func: async function(context) {
    let arrServer = [];
    for (var key in config) {
    try {
        let state = await Gamedig.query({
          type: "bf2142",
          host: config[key],
          port: key
        });
        let ask =
          state.name + " " + state.raw.numplayers + "/" + state.raw.maxplayers;
        arrServer.push(ask);
    } catch (error) {
      console.log(error);
      context.send(error+"text");
    }
  }

    arrServer = arrServer.join("\n");
    context.send(arrServer);


  },
  help: 'Все сервера',
  desc: 'список всех серверов с текущим онлайном'
};