// Day #: Name

// Part 1

const input = await Deno.readTextFile('../input')
// const input = await Deno.readTextFile('../test-input')

const splitInput = input.split(/\n{2}/g)

const ruleIndex = {}

const pageRules = splitInput[0].split(/\n/g).map((rule) => {
  const ruleArr = rule.split(/\|/).map(Number)

  if (ruleIndex[ruleArr[0]] === undefined) {
    ruleIndex[ruleArr[0]] = [ruleArr[1]]
  } else {
    ruleIndex[ruleArr[0]].push(ruleArr[1])
  }

  return ruleArr
})

const pageUpdates = splitInput[1].split(/\n/g).map((update) => {
  if (update !== '') {
    return update.split(/,/).map(Number)
  }
})

const correctUpdates = []
function checkUpdate(update) {
  if (update !== undefined) {
    const updateLength = update.length
    console.log(update)
    let wrongOrder = false

    for (let i = 0; i < updateLength; i++) {
      const page = update[i]

      console.log(
        'page',
        page,
      )

      for (let p = i; p < updateLength; p++) {
        if (p !== i) {
          if (ruleIndex[update[p]] !== undefined) {
            const findUpdated = ruleIndex[update[p]].includes(page)
            console.log(update[p], ' is true: ', findUpdated)
            if (findUpdated) {
              wrongOrder = true
              break
            }
          } else {
            console.log(update[p], 'undefined')
          }
        }
      }

      if (wrongOrder) {
        break
      }
    }

    if (!wrongOrder) {
      correctUpdates.push(update)
    }
  }
}

pageUpdates.map((update) => {
  checkUpdate(update)
})

console.log(correctUpdates)

const middlePages = correctUpdates.map((update) => {
  const midIndex = Math.round(update.length / 2) - 1
  console.log(midIndex, ' is', update[midIndex])
  return update[midIndex]
})

console.log('middle numbers', middlePages)

const midPgSum = middlePages.reduce(
  (accumalator, currentNum) => accumalator + currentNum,
  0,
)

console.log('the sum is: ', midPgSum)
// console.log(input)
// console.log(splitInput, splitInput.length, splitInput[1], splitInput[0])

// console.log(pageRules, pageUpdates, ruleIndex)
// console.log()

// Part 2
