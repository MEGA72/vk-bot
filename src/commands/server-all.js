var configServers = require('../../config/servers.json');

module.exports = {
  regexp: /^Все сервера$/i,
  func: async function(context,{Gamedig}) {
    let arrServer = [];
    for (var key in configServers) {
    try {
        let state = await Gamedig.query({
          type: "bf2142",
          host: configServers[key],
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