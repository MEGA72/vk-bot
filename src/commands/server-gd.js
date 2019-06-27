const { VK } = require("vk-io");
const Gamedig = require("gamedig");

module.exports = {
  regexp: /^гд$/i,
  func: async function(context) {
    try {
      const state = await Gamedig.query({
        type: "bf2142",
        host: "188.246.224.35",
        port: 30089
      });
      let ask =
        state.name + " " + state.raw.numplayers + "/" + state.raw.maxplayers;
      let statePlayers = "";
      for (let i = 0; i < state.players.length; i++) {
        state.players[i].name = state.players[i].name.split(" ")[1];
        statePlayers = statePlayers + state.players[i].name + "\n";
      }
      context.send(ask);
      if (statePlayers == "") {
      } else {
        context.send(statePlayers);
      }
    } catch (error) {
      context.send(ErrorMessage);
    }
  },
  help: 'гд',
  desc: 'онлайн сервера'
};

