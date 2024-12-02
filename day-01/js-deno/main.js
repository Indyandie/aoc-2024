// Day 1: Historian Hysteria ---

// Part 1
const input = await Deno.readTextFile('../input')
const splitInput = input.split(/\s+|\n+/)
const leftList = []
const rightList = []
let totalDistance = 0

splitInput.map((locationIdString, index) => {
  if (locationIdString == false) {
    // console.log(`This is falsy ${locationIdString}, index: ${index}`)
    return
  }
  const indexModulo = index % 2
  const locationId = Number(locationIdString)

  if (indexModulo === 0) {
    leftList.push(locationId)
  } else {
    rightList.push(locationId)
  }
})

leftList.sort((a, b) => a - b)
rightList.sort((a, b) => a - b)

for (let i = 0; i < leftList.length; i++) {
  const distance = Math.abs(leftList[i] - rightList[i])
  totalDistance = totalDistance + distance
}

// check first and last location_ID on each list
// console.log('Left List:', leftList[0], leftList[leftList.length - 1], leftList.length)
// console.log('Right List:', rightList[0], rightList[rightList.length - 1], rightList.length)

console.log(`The total distance is ${totalDistance}`, )

// Part 2

let similarityScore = 0

for (let i = 0; i < leftList.length; i++) {
  const leftNumber = leftList[i]
  const frequency = rightList.filter((rightNumber) => leftNumber === rightNumber).length
  const similarity = leftNumber * frequency

  similarityScore = similarityScore + similarity
  // console.log(frequency, 'similarity', similarity)
}

console.log(`The similarity score is ${similarityScore}`,)
