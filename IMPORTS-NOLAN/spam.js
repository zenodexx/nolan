const fs = require('fs')
const path = './BANK-NOLAN/antispam.json'

if (!fs.existsSync(path)) fs.writeFileSync(path, '{}')

const isFiltered = (sender) => {
const spamData = JSON.parse(fs.readFileSync(path))
const lastUsed = spamData[sender]
if (!lastUsed) return false
const now = Date.now()
return (now - lastUsed < 3000) // 3 segundos
}

const addFilter = (sender) => {
const spamData = JSON.parse(fs.readFileSync(path))
spamData[sender] = Date.now()
fs.writeFileSync(path, JSON.stringify(spamData, null, 2))
}

module.exports = { isFiltered, addFilter }