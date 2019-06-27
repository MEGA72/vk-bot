

module.exports = {
  regexp: /^при/i,
  func: async function(context,{ vk }) {
    let name = await vk.api.users.get({
      user_id: context.senderId
    });
    context.send(
      "добро пожаловать " + name[0].first_name + " чтобы начать отправь 2142"
    );
  
  },
  help: 'привет',
  desc: 'стартовое сообщение для начала работы'
};

