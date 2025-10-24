const fs = require('fs');
const votacao = JSON.parse(fs.readFileSync('./BANK-NOLAN/grupos/votacao/votacao.json'))

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const delVoto = (idGroup) => {
    processo = votacao.indexOf(idGroup)
      while(processo >= 0) {
    votacao.splice(processo, 1)
      processo = votacao.indexOf(idGroup)
    }
      fs.writeFileSync(`./BANK-NOLAN/grupos/votacao/votacaoduelo.json` ,  JSON.stringify(votacao))
      fs.unlinkSync(`./BANK-NOLAN/grupos/votacao/votos/${ID}.json`)
      fs.unlinkSync(`./BANK-NOLAN/grupos/votacao/p_votos/${ID}.json`)
}

const addVoto = async(ID, _valor1 , _valor2, _valor3, _valor4, reply) => {
   votacao.push(ID)
      fs.writeFileSync(`./BANK-NOLAN/grupos/votacao/p_votos/${ID}.json`, [])
      fs.writeFileSync(`./BANK-NOLAN/grupos/votacao/votos/${ID}.json`, [])
      fs.writeFileSync('./BANK-NOLAN/grupos/votacao/votacaoduelo.json', JSON.stringify(votacao))
    await sleep(2000)
       let votos = JSON.parse(fs.readFileSync(`./BANK-NOLAN/grupos/votacao/votos/${ID}.json`))
  votos.push({
    razao: _valor1 ? _valor1 : '-' ,
    votos: _valor2.trim() + '@s.whatsapp.net' ,
    votos2: _valor3.trim() + '@s.whatsapp.net',
    duracao: _valor4
 })
    fs.writeFileSync(`./BANK-NOLAN/grupos/votacao/votos/${ID}.json` ,  JSON.stringify(votos))
      setTimeout( async function() {
         voto = JSON.parse(fs.readFileSync(`./BANK-NOLAN/grupos/votacao/p_votos/${ID}.json`))
             let verdade = voto.filter(dds => dds.votacao == '1')
             let falso = voto.filter(dds => dds.votacao == '2')
        reply(`Votação encerrada.\n\nTotal de votos pro 1° Participante:  ${verdade.length}.\nTotal de votos pro 2° Participante:  ${falso.length}`)
    fs.unlinkSync(`./BANK-NOLAN/grupos/votacao/votos/${ID}.json`)
    fs.unlinkSync(`./BANK-NOLAN/grupos/votacao/p_votos/${ID}.json`)
    fs.writeFileSync(`./BANK-NOLAN/grupos/votacao/votacao.json` ,  JSON.stringify(votacao))
    },  _valor4 * 60 * 1000)
}

module.exports = {
    delVoto,
    addVoto
}
