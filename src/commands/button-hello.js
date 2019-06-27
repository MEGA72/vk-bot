const { Keyboard } = require("vk-io");

module.exports = {
  regexp: /^2142$/,
  func: async function(context) {
      await context.send({
        message: `Обновляю кнопки`,
    
        keyboard: Keyboard.keyboard([
          Keyboard.textButton({
            label: "Все сервера",
            payload: {
              command: "Все сервера"
            },
            color: Keyboard.POSITIVE_COLOR
          }),
          Keyboard.locationRequestButton({
            payload: {
              payload: '{"button": "1"}'
            }
          }),
          [
            Keyboard.textButton({
              label: "котики",
              payload: {
                command: "cat"
              },
              color: Keyboard.NEGATIVE_COLOR
            }),
            Keyboard.textButton({
              label: "цитата",
              payload: {
                command: ""
              },
              color: Keyboard.PRIMARY_COLOR
            }),
            Keyboard.textButton({
              label: "стата",
              payload: {
                command: "стата"
              },
              color: Keyboard.PRIMARY_COLOR
            })
          ],
          [
            Keyboard.textButton({
              label: "титаны",
              payload: {
                command: "титаны"
              },
              color: Keyboard.PRIMARY_COLOR
            }),
            Keyboard.textButton({
              label: "гд",
              payload: {
                command: "гд"
              },
              color: Keyboard.PRIMARY_COLOR
            }),
            Keyboard.textButton({
              label: "гд конквест",
              payload: {
                command: "гд конквест"
              },
              color: Keyboard.PRIMARY_COLOR
            }),
            Keyboard.textButton({
              label: "ганшип",
              payload: {
                command: "ганшип"
              },
              color: Keyboard.PRIMARY_COLOR
            })
          ],
          Keyboard.textButton({
            label: "проверять",
            payload: {
              command: "проверять"
            },
            color: Keyboard.POSITIVE_COLOR
          })
        ])
      });
  },
  help: '2142',
  desc: 'обновить клавиатуру'
};

