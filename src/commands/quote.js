const axios = require("axios");
const urlApi =
  "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru"; //json цитат
module.exports = {
  regexp: /^цитата$/,
  func: function(context) {
    axios
    .get(urlApi)
    .then(function(response) {
      let quoteForSite = response.data;
      if (quoteForSite.quoteAuthor == "") {
        context.send(quoteForSite.quoteText);
      } else {
        context.send(
          `${quoteForSite.quoteText} \n \n Автор: ${quoteForSite.quoteAuthor}`
        );
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  },
  help: 'цитата',
  desc: 'прислать случаюную цитату'
};






// updates.hear(/^погода$/i, async context => {
//   axios
//     .get(urlApi3)
//     .then(response => {
//       context.send(`сейчас в ${response.data.name} ${
//         response.data.main.temp
//       } градуса цельсия
//     небо ${response.data.weather[0].description} ветер ${
//         response.data.wind.speed
//       } метра в секунду`);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });