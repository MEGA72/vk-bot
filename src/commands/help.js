module.exports = {
  regexp: /^(помощь|команды|х[еэ]лп)$/i,
  func: async(context, { cmds }) => {
    let result = [
      `Команды для Пользователей`,
      cmds
      .map(cmd => `${cmd.help} -- ${cmd.desc}`).join('\n') || 'Нет команд'
    ].join('\n');
    context.send(result);
  },
  help: 'помощь',
  desc: 'список команд'
};