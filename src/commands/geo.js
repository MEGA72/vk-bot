// const senderid = context.senderId;
// const latitude  = context.geo.coordinates.latitude;
// const longitude = context.geo.coordinates.longitude;
const fs = require('fs');
const userToJson = require('../../geoBd.json')

module.exports = {
    func: async function(context,senderid,latitude,longitude) {
//сверяем значения ключ ID с ID пользователя
objIndex = userToJson.features.findIndex((obj => obj.id == senderid));

//проверяем нашли ли ID в json
if(objIndex !== -1){

//Log object to Console.
// console.log("Before update: ", userToJson.features[objIndex].geometry.coordinates)

//Update object name property.
userToJson.features[objIndex].geometry.coordinates = [latitude,longitude]

//Log object to console again.
// console.log("After update: ", userToJson.features[objIndex].geometry.coordinates)

context.send(`Обновили координаты`)
//если не нашли то записываем новый объект
} else {
  console.log("new object");

  //новый объект
  newObject = {
  type: "Feature",
  id: senderid,
  geometry: {
    type: "Point",
    coordinates: [latitude, longitude]
  },
  properties: {
    balloonContentHeader:
      `${senderid}`  }
}

//добавили в массив объекта
userToJson.features.push(newObject);
context.send("Добавили координаты")
}


//записали в файл
fs.writeFile ('./geoBd.json', JSON.stringify(userToJson), function(err) {
  if (err) throw err;
  console.log('complete');
  }
)

}
}