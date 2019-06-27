const axios = require("axios");
const urlApi3 =
  "http://api.openweathermap.org/data/2.5/weather?id=1488754&appid=459f7eb89d639d7d52ae09b17e27159c&units=metric";
  
module.exports = {
  regexp: /^погода$/,
  func: function(context) {
    axios
    .get(urlApi3)
    .then(response => {
      context.send(`сейчас в ${response.data.name} ${
        response.data.main.temp
      } градуса цельсия
    небо ${response.data.weather[0].description} ветер ${
        response.data.wind.speed
      } метра в секунду`);
    })
    .catch(error => {
      console.log(error);
    });
  },
  help: 'погода',
  desc: 'запрос погоды для меги'
};



