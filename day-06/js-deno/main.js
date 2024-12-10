// Day #: Name

// Part 1

const input = await Deno.readTextFile('../input')
// const input = await Deno.readTextFile('../test-input')

const guard = {
  x: 0,
  y: 0,
  direction: 0,
  walkX: 0,
  walkY: -1,
  started: false,
  onPatrol: true,
  lastStep: 0,
}

let startX
let startY

const map = input.split(/\n/).map((line, index) => {
  if (guard.started === false) {
    const position = line.indexOf('^')
    if (position > -1) {
      startY = index
      startX = position
      guard.y = startY
      guard.x = startX
    }
  }

  if (line !== '') {
    return line.split('').map((pos) => {
      if (pos !== '#') {
        return 0
      }
      return pos
    })
  }
})

const walking = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  down: { x: 1, y: 0 },
}

const walkArr = [
  { dir: 'up', x: 0, y: -1 },
  { dir: 'right', x: 1, y: 0 },
  { dir: 'down', x: 0, y: 1 },
  { dir: 'left', x: -1, y: 0 },
]

const mapX = map[0].length - 1
const mapY = map.length - 2

function checkObstacles(x, y) {
  if (
    x > mapX ||
    y > mapY ||
    x < 0 ||
    y < 0
  ) {
    return false
  } else {
    const look = map[y][x] === '#'
    return look
  }
}

function turnGuard(dir) {
  let newDir = dir + 1
  if (newDir > walkArr.length - 1) {
    newDir = 0
  }

  guard.direction = newDir
  guard.walkX = walkArr[newDir].x
  guard.walkY = walkArr[newDir].y

  // console.log('guard has turned', guard)
}

function moveGuard(guard, map, add = false) {
  map[guard.y][guard.x] = map[guard.y][guard.x] + 1
  guard.x = guard.x + guard.walkX
  guard.y = guard.y + guard.walkY

  if (
    guard.x > mapX ||
    guard.y > mapY ||
    guard.x < 0 ||
    guard.y < 0
  ) {
    guard.onPatrol = false
    return false
  }

  return true
}

const moveHistory = []

while (guard.onPatrol) {
  const nextX = guard.x + guard.walkX
  const nextY = guard.y + guard.walkY

  // console.log('next move: ', 'x', nextX, 'y', nextY)
  // console.log('Bounds: ', mapX, mapY)

  const turn = checkObstacles(nextX, nextY)

  let checkMove = undefined
  if (
    nextX < mapX &&
    nextY < mapY &&
    nextX > 0 &&
    nextY > 0
  ) {
    checkMove = map[nextY][nextX]
  }

  if (checkMove !== '#' && checkMove !== undefined) {
    // console.log('check move: ', 'x', nextX, 'y', nextY)
    const isStart = startX !== nextX || startY !== nextY
    // console.log('start: ', isStart, 'x', startX, 'y', startY)
    if (
      startX !== nextX ||
      startY !== nextY
    ) {
      const dupes = moveHistory.find((item) => {
        // console.log('find move: ', 'x', nextX, 'y', nextY)
        return nextX === item[0] && nextY === item[1]
      })

      if (dupes === undefined) {
        // console.log('pushed move: ', 'x', nextX, 'y', nextY)
        moveHistory.push([nextX, nextY])
        // console.log('no dupe: ', dupes)
        // console.log('len: ', moveHistory.length, guard.x, guard.y)
      } else {
        // console.log('dupe: ', dupes)
        // console.log('len: ', moveHistory.length, guard.x, guard.y)
      }
    }
  }

  if (!turn) {
    moveGuard(guard, map, true)
  } else {
    turnGuard(guard.direction)
  }
}

// console.log(walking[2])
let moveCount = 0

const mapCount = map.map((row) => {
  if (row !== undefined) {
    row.map((item) => {
      if (item === 'X') {
        moveCount = moveCount + 1
      }
    })
  }
})

console.log(map.join(' ').replaceAll(',', '').replaceAll(' ', '\n'))

console.log(moveCount)

// Part 2
const guardInit = {
  x: startX,
  y: startY,
  direction: 0,
  walkX: 0,
  walkY: -1,
  started: false,
  onPatrol: true,
}

const mapInit = input.split(/\n/).map((line, index) => {
  if (line !== '') {
    return line.split('').map((pos) => {
      if (pos !== '#') {
        return 0
      }
      return pos
    })
  }
})

function checkMapObstacles(x, y, map) {
  if (
    x > mapX ||
    y > mapY ||
    x < 0 ||
    y < 0
  ) {
    return false
  } else {
    // console.log('x', x, mapX, 'y', y, mapY)
    const look = map[y][x] === '#' || map[y][x] === 'X'
    // console.log(look)
    return look
  }
}

function turnThisGuard(guard) {
  let newDir = guard.direction + 1

  if (newDir > walkArr.length - 1) {
    newDir = 0
  }

  guard.direction = newDir
  guard.walkX = walkArr[newDir].x
  guard.walkY = walkArr[newDir].y

  // moveThisGuard(guard, map)
  // console.log('guard has turned', guard)
}

function moveThisGuard(guard, map) {
  map[guard.y][guard.x] = map[guard.y][guard.x] + 1
  guard.lastStep = map[guard.y][guard.x]
  guard.x = guard.x + guard.walkX
  guard.y = guard.y + guard.walkY

  if (
    guard.x > mapX ||
    guard.y > mapY ||
    guard.x < 0 ||
    guard.y < 0
  ) {
    guard.onPatrol = false
    return false
  }
  return true
}

let obstacleCount = 0

function testGuard(x, y) {
  const guard = { ...guardInit }
  const map = JSON.parse(JSON.stringify(mapInit))
  map[y][x] = 'X'

  while (guard.onPatrol) {
    const nextX = guard.x + guard.walkX
    const nextY = guard.y + guard.walkY

    const turn = checkMapObstacles(nextX, nextY, map)

    if (!turn) {
      // if (!moveThisGuard(guard, map)) {
      //   break
      // }
      moveThisGuard(guard, map)
    } else {
      turnThisGuard(guard, map)
      // if (!moveThisGuard(guard, map)) {
      //   break
      // }
    }
    if (guard.lastStep > 8) {
      console.log('LOOOP')
      guard.onPatrol = false
      obstacleCount = obstacleCount + 1
      break
    }
  }

  console.log(map.join(' ').replaceAll(',', '').replaceAll(' ', '\n'))
}

moveHistory.map((pos, index) => {
  testGuard(pos[0], pos[1])
  console.log('index: ', index, 'position: ', pos, 'len: ', moveHistory.length)
})

// console.log(mapInit)

// console.log(moveHposistory)
console.log(obstacleCount)
