// import file, extract UUID into map
const fs = require('fs')

const lineReader = require('readline').createInterface({
  input: fs.createReadStream('calendar.ics')
})
const UIDs = []
lineReader.on('line', (line) => {
  if (line.startsWith("UID")) {
    UIDs.push(line.slice(4))
  }
})

// Save to file
lineReader.on('close', () => {
  fs.writeFileSync('uids.json', JSON.stringify(UIDs))
})

// Length of file
// lineReader.on('close', () => {
//   console.log(UIDs.length)
// })
