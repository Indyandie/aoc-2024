// Day 2: Red-Nosed Reports

// Part 1
const input = await Deno.readTextFile('../input')
const splitInput = input.split(/\n+/)
const reports = []

splitInput.map((report) => {
  if (report === '') {
    return
  }
  const reportArray = report.split(/\s/)
  reports.push(reportArray)
  // console.log('report', reportArray, ' length', reportArray.length)
})

const unsafeReports = []
const safeReports = []

function checkLevel(currentLevel, previousLevel, allLevels) {
  const levelsDiff = currentLevel - previousLevel
  if (levelsDiff === 0) {
    const results = {
      error: `No increase or decrease\n${currentLevel}, <- ${previousLevel}`,
      safe: false,
      levels: allLevels,
    }
    return results
  } else if (Math.abs(levelsDiff) > 3) {
    const results = {
      error: `increase/decrease is more than 3, ${currentLevel}, <- ${previousLevel}`,
      safe: false,
      levels: allLevels,
    }
    return results
  }
  const increasing = levelsDiff > 0

  return {
    increasing,
    safe: true,
    comparedLevels: [previousLevel, currentLevel],
  }
}

reports.map((reportLevels) => {
  let previousCheck = checkLevel(reportLevels[1], reportLevels[0])
  if (!previousCheck.safe) {
    unsafeReports.push(previousCheck)
    return
  }

  for (let i = 2; i < reportLevels.length; i++) {
    const currentLevel = reportLevels[i]
    const previousLevel = reportLevels[i - 1]
    const currentCheck = checkLevel(currentLevel, previousLevel, reportLevels)
    if (!currentCheck.safe) {
      unsafeReports.push(currentCheck)
      return
    } else if (currentCheck.increasing !== previousCheck.increasing) {
      const results = {
        error: `shifting from increase or decrease\n${currentLevel} ${previousCheck.comparedLevels}`,
        safe: false,
        levels: reportLevels,
      }

      unsafeReports.push(results)
      return
    }
    previousCheck = currentCheck
  }

  const safeResults = {
    safe: true,
    levels: reportLevels,
  }

  safeReports.push(safeResults)
})

// console.log(reports.length) // it's adding two empty strings
// console.log(unsafeReports)
console.log('Unsafe Reports: ', unsafeReports.length)
console.log('Safe Reports: ', safeReports.length)

// Part 2
