const fs = require('fs')

const result = fs.readFileSync('./1-json.json')
console.log(result);

const resultStr = result.toString()
console.log(resultStr);

const resultObj = JSON.parse(resultStr);
console.log(resultObj);

resultObj.name = 'Zhe'
resultObj.age = 28
console.log(resultObj);

const resultJson = JSON.stringify(resultObj)

fs.writeFileSync('1-json.json',resultJson)