const debug = require('debug')('linto:skill:v2:linto-skill:definition:events:definition')

const itemWords = 'objet'

module.exports = async function (msg) {
  let tts = this.skillConfig[this.skillConfig.language]

  if (msg.payload.nlu.entitiesNumber !== 1) {
    return { say: tts.say.error_entities_number }
  }

  let word = this.payloadAction.extractEntityFromName(msg.payload, itemWords).value
  if (!word) {
    return { say: tts.say.error_unknown_word }
  }

  let result = await this.controller[this.config.api](word)
  
  return { say: `${tts.say.start} ${result.word} ${tts.say.middle} ${result.definition}`}
}