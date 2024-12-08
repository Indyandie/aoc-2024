// Day #: Name

// Part 1

const input = await Deno.readTextFile('../input')
const guard = {
  x: 0,
  y: 0,
  direction: 0,
  walkX: 0,
  walkY: -1,
  started: false,
  onPatrol: true,
}
const map = input.split(/\n/).map((line, index) => {
  if (guard.started === false) {
    const position = line.indexOf('^')
    if (position > -1) {
      guard.y = index
      guard.x = position
      console.log(index, position, line)
    }
  }

  if (line !== '') {
    return line.split('')
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
    console.log('x', x, mapX, 'y', y, mapY)
    const look = map[y][x] === '#'
    console.log(look)
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

  console.log('guard has turned', guard)
}

function moveGuard() {
  map[guard.y][guard.x] = 'X'
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

while (guard.onPatrol) {
  console.log(guard)
  const nextX = guard.x + guard.walkX
  const nextY = guard.y + guard.walkY
  const turn = checkObstacles(nextX, nextY)

  console.log(nextX, nextY, turn)

  if (!turn) {
    if (!moveGuard()) {
      break
    }
    console.log(guard)
  } else {
    turnGuard(guard.direction)
    if (!moveGuard()) {
      break
    }
    console.log(guard)
  }
}

console.log(map.join(' ').replaceAll(',', '').replaceAll(' ', '\n'))

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

console.log(moveCount)
// Part 2
