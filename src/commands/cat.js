module.exports = {
  regexp: /^котики/i,
  func: async function(context) {
    await Promise.all([
      context.send("сейчас вылетит котик 😻... Ждите..."),
      context.setActivity(1),
      await context.sendPhoto("https://loremflickr.com/400/300/")
    ]);
  
  },
  help: 'котики',
  desc: 'прислать картинку'
};

