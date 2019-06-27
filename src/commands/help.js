module.exports = {
  regexp: /^(помощь|команды|х[еэ]лп)$/i,
  func: async(msg, { botN, cmds }) => {
    let result = [
      `Команды для Пользователей`,
      cmds
      .map(cmd => `${cmd.help} -- ${cmd.desc}`).join('\n') || 'Нет команд'
    ].join('\n');
    msg.ok(result);
  },
  help: 'помощь',
  desc: 'список команд'
};