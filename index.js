let game = []
const difficulty = document.querySelector('select')
const timerHundreds = document.querySelector('.timer-hundreds')
const timerTens = document.querySelector('.timer-tens')
const timerOnes = document.querySelector('.timer-ones')
let mines
let hundreds = 0
let tens = 0
let ones = 0
const minesHundreds = document.querySelector('.mines-hundreds')
const minesTens = document.querySelector('.mines-tens')
const minesOnes = document.querySelector('.mines-ones')
let mHundreds = 0
let mTens = 0
let mOnes = 0
let fireworksId
let timerId

const newGame = () => {
  clearInterval(fireworksId)
  clearInterval(timerId)
  timerId = undefined
  game = []
  hundreds = 0
  tens = 0
  ones = 0
  timerHundreds.innerText = 0
  timerTens.innerText = 0
  timerOnes.innerText = 0
  const playArea = document.getElementById('play-area')
  playArea.innerHTML = ''
  playArea.classList = ''
  if (difficulty.value === 'easy') {
    mines = 10
    mHundreds = 0
    mTens = 1
    mOnes = 0
    minesHundreds.innerText = 0
    minesTens.innerText = 1
    minesOnes.innerText = 0
    playArea.classList.add('easy')
    getSquares(81)

    getMines(10, game.length)



    game.forEach(element => {
      playArea.append(element)
    })
  } else if (difficulty.value === 'medium') {
    mines = 40
    mHundreds = 0
    mTens = 4
    mOnes = 0
    minesHundreds.innerText = 0
    minesTens.innerText = 4
    minesOnes.innerText = 0
    playArea.classList.add('medium')
    getSquares(256)

    getMines(40, game.length)

    game.forEach(element => {
      playArea.append(element)
    })
  } else if (difficulty.value === 'hard') {
    mines = 99
    mHundreds = 0
    mTens = 9
    mOnes = 9
    minesHundreds.innerText = 0
    minesTens.innerText = 9
    minesOnes.innerText = 9
    playArea.classList.add('hard')
    getSquares(480)

    getMines(99, game.length)

    game.forEach(element => {
      playArea.append(element)
    })
  }
}

const getSquares = (count) => {
  let id = 0
  for (let i = 0; i < count; i++) {
    let newSquare = document.createElement('div')
    newSquare.classList.add('game-square')
    newSquare.id = id
    newSquare.addEventListener('auxclick', rightClick)
    newSquare.addEventListener('click', leftClick)
    game.push(newSquare)
    id++
  }
}

const leftClick = (e) => {
  click(+e.srcElement.id)
}

const rightClick = (e) => {
  const square = document.getElementById(+e.target.id)
  minesDown()
  square.classList.add('flag-square')
  square.removeEventListener('click', lose)
  square.removeEventListener('click', leftClick)
  square.removeEventListener('auxclick', rightClick)
  square.addEventListener('auxclick', questionMark)
  square.innerHTML = `<img class='icon' src='./Assets/flag.png' />`
}

const questionMark = (e) => {
  const square = document.getElementById(+e.target.parentElement.id)
  square.innerHTML = `<img class='icon' src='./Assets/question.png' />`
  square.removeEventListener('auxclick', questionMark)
  square.addEventListener('auxclick', remove)
  minesUp()
}

const remove = (e) => {
  const square = document.getElementById(+e.target.parentElement.id)
  square.addEventListener('click', leftClick)
  square.addEventListener('auxclick', rightClick)
  square.removeEventListener('auxclick', remove)
  square.innerHTML = ''
  if (square.classList.contains('mine-square')) {
    square.addEventListener('click', lose)
  }
}

const checkWin = () => {
  let minesIds = []
  let flagsIds = []
  const mines = document.getElementsByClassName('mine-square')
  const flags = document.getElementsByClassName('flag-square')
  for (let i = 0; i < flags.length; i++) {
    minesIds.push(+mines[i].id)
    flagsIds.push(+flags[i].id)
  }

  let winCon = true

  minesIds.sort()
  flagsIds.sort()
  minesIds.forEach((element, index) => {
    if (element !== flagsIds[index]) {
      winCon = false
    }
  })

  if (winCon) {
    const squares = document.getElementsByClassName('game-square')
    for (let i = 0; i < squares.length; i++) {
      let square = squares[i]
      square.removeEventListener('click', leftClick)
      square.removeEventListener('click', lose)
      square.removeEventListener('auxclick', rightClick)
      square.removeEventListener('auxclick', questionMark)
      square.removeEventListener('auxclick', remove)
    }
    clearInterval(timerId)
    fireworksId = setInterval(() => {
      fireworks()
    }, 100);

  } else {
    alert('You got some wrong')
  }
}

const getMines = (numMines, length) => {
  const minesIndex = []
  while (numMines > 0) {
    let newMine = Math.floor(Math.random() * length)
    let index = minesIndex.findIndex(element => element === newMine)
    if (index === -1) {
      minesIndex.push(newMine)
      numMines--
    }
  }

  minesIndex.forEach(element => {
    let square = game[element]
    square.addEventListener('click', lose)
    square.classList.add('mine-square')
    // square.innerHTML = `<img class='icon' src='./Assets/mine.ico' />`
  })

  return minesIndex
}

const click = (id, callingSquare) => {
  if (!timerId) {
    timerId = setInterval(() => {
      timer()
    }, 1000);
  }
  let num = 0
  let square = document.getElementById(+id)
  let checks
  square.classList.add('clicked')

  if (square.classList.contains('mine-square')) {
    lose()
    return
  }

  switch (difficulty.value) {
    case 'easy':
      checks = getChecks('easy', id)
      break;
    case 'medium':
      checks = getChecks('medium', id)
      break
    case 'hard':
      checks = getChecks('hard', id)
      break
    default:
      return console.log('error')
  }

  checks.corners.forEach(element => {
    if (element && element.classList.contains('mine-square')) {
      num++
    }
  })

  checks.squareChecks.forEach(element => {
    if (element && element.classList.contains('mine-square')) {
      num++
    }
  })

  checks.squareChecks.forEach(element => {
    if (num === 0 && element && !element.classList.contains('clicked')) {
      click(+element.id, +id)
    }
  })

  if (num !== 0) {
    square.innerText = num
    switch (num) {
      case 1:
        square.style.color = '#0000ff'
        break;
      case 2:
        square.style.color = '#007b00'
        break
      case 3:
        square.style.color = '#ff0000'
        break
      case 4:
        square.style.color = '#00007b'
        break
      case 5:
        square.style.color = '#800000'
        break
      case 6:
        square.style.color = '#007b7b'
        break
      case 7:
        square.style.color = '#000000'
        break
      case 8:
        square.style.color = '#7b7b7b'
        break
      default:
        square.style.color = 'c0c0c0'
    }
  }
  return num
}


const getChecks = (difficulty, id) => {
  let squareChecks = []
  const corners = []
  switch (difficulty) {
    case 'easy':
      const easyLeft = [9, 18, 27, 36, 45, 54, 63]
      const easyRight = [17, 26, 35, 44, 53, 62, 71]
      const easyTop = [1, 2, 3, 4, 5, 6, 7]
      const easyBottom = [73, 74, 75, 76, 77, 78, 79]

      switch (+id) {
        case 0:
          corners.push(game[10])
          squareChecks.push(game[1], game[9])
          break;
        case 72:
          corners.push(game[64])
          squareChecks.push(game[63], game[73])
          break;
        case 8:
          corners.push(game[16])
          squareChecks.push(game[7], game[17])
          break;
        case 80:
          corners.push(game[70])
          squareChecks.push(game[71], game[79])
          break;
        default:
          if (easyLeft.includes(+id)) {
            squareChecks.push(game[id + 1], game[id - 9], game[id + 9])
            corners.push(game[+id - 8], game[+id + 10])
          } else if (easyRight.includes(+id)) {
            squareChecks.push(game[id - 1], game[id - 9], game[id + 9])
            corners.push(game[+id - 10], game[+id + 8])
          } else if (easyTop.includes(+id)) {
            squareChecks.push(game[+id - 1], game[+id + 1], game[+id + 9])
            corners.push(game[+id + 8], game[+id + 10])
          } else if (easyBottom.includes(+id)) {
            squareChecks.push(game[+id - 1], game[+id + 1], game[+id - 9])
            corners.push(game[+id - 10], game[+id - 8])
          } else {
            squareChecks.push(game[id - 1], game[id + 1], game[id - 9], game[id + 9])
            corners.push(game[id - 10], game[id - 8], game[id + 8], game[id + 10])
          }
      }
      break;
    case 'medium':
      const mediumLeft = [16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224]
      const mediumRight = [31, 47, 63, 79, 95, 111, 127, 143, 159, 175, 191, 207, 223, 239]
      const mediumTop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      const mediumBottom = [241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254]

      switch (+id) {
        case 0:
          corners.push(game[17])
          squareChecks.push(game[1], game[16])
          break;
        case 240:
          corners.push(game[225])
          squareChecks.push(game[224], game[241])
          break;
        case 15:
          corners.push(game[30])
          squareChecks.push(game[14], game[31])
          break;
        case 255:
          corners.push(game[238])
          squareChecks.push(game[239], game[254])
          break;
        default:
          if (mediumLeft.includes(+id)) {
            squareChecks.push(game[id + 1], game[id - 16], game[id + 16])
            corners.push(game[+id - 15], game[+id + 17])
          } else if (mediumRight.includes(+id)) {
            squareChecks.push(game[id - 1], game[id - 16], game[id + 16])
            corners.push(game[+id - 17], game[+id + 15])
          } else if (mediumTop.includes(+id)) {
            squareChecks.push(game[+id - 1], game[+id + 1], game[+id + 16])
            corners.push(game[+id + 17], game[+id + 15])
          } else if (mediumBottom.includes(+id)) {
            squareChecks.push(game[+id - 1], game[+id + 1], game[+id - 16])
            corners.push(game[+id - 17], game[+id - 15])
          } else {
            squareChecks.push(game[id - 1], game[id + 1], game[id - 16], game[id + 16])
            corners.push(game[id - 17], game[id - 15], game[id + 15], game[id + 17])
          }
      }
      break
    case 'hard':
      const hardLeft = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450]
      const hardRight = [29, 59, 89, 119, 149, 179, 209, 239, 269, 299, 329, 359, 389, 419, 449, 479]
      const hardTop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
      const hardBottom = [451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478]

      switch (+id) {
        case 0:
          corners.push(game[31])
          squareChecks.push(game[1], game[30])
          break;
        case 450:
          corners.push(game[421])
          squareChecks.push(game[420], game[451])
          break;
        case 29:
          corners.push(game[58])
          squareChecks.push(game[28], game[59])
          break;
        case 479:
          corners.push(game[448])
          squareChecks.push(game[449], game[478])
          break;
        default:
          if (hardLeft.includes(+id)) {
            squareChecks.push(game[id + 1], game[id - 30], game[id + 30])
            corners.push(game[+id - 29], game[+id + 31])
          } else if (hardRight.includes(+id)) {
            squareChecks.push(game[id - 1], game[id - 30], game[id + 30])
            corners.push(game[+id - 31], game[+id + 29])
          } else if (hardTop.includes(+id)) {
            squareChecks.push(game[+id - 1], game[+id + 1], game[+id + 30])
            corners.push(game[+id + 29], game[+id + 31])
          } else if (hardBottom.includes(+id)) {
            squareChecks.push(game[+id - 1], game[+id + 1], game[+id - 30])
            corners.push(game[+id - 29], game[+id - 31])
          } else {
            squareChecks.push(game[id - 1], game[id + 1], game[id - 30], game[id + 30])
            corners.push(game[id - 31], game[id - 29], game[id + 29], game[id + 31])
          }
      }
      break
    default:
      console.log('error')
  }

  return {
    squareChecks,
    corners
  }
}

const lose = () => {
  clearInterval(timerId)
  let mineSquares = document.getElementsByClassName('mine-square')
  for (let i = 0; i < mineSquares.length; i++) {
    mineSquares[i].innerHTML = `<img class='icon' src='./Assets/mine.ico' />`
    mineSquares[i].classList.add('mine-lose')
  }
}

const fireworks = () => {
  const screen = document.querySelector('.holder')
  let startingLocation = Math.floor(Math.random() * window.innerWidth)
  let color1 = Math.floor(Math.random() * 255)
  let color2 = Math.floor(Math.random() * 255)
  let color3 = Math.floor(Math.random() * 255)
  let trail = document.createElement('div')
  trail.classList.add('firework-trail')
  trail.style.background = `rgb(${color1}, ${color2}, ${color3})`
  trail.style.left = `${startingLocation - 5}px`
  trail.addEventListener('animationend', (e) => {
    e.target.remove()
    let angle = 0
    for (let i = 0; i < 12; i++) {
      let spark = document.createElement('div')
      spark.classList.add('spark')
      spark.style.background = `rgb(${color1}, ${color2}, ${color3})`
      spark.style.transform = `rotate(${angle}deg)`
      spark.style.left = `${startingLocation - 5}px`
      screen.appendChild(spark)
      angle += 15
    }
  })
  screen.appendChild(trail)
}

const timer = () => {
  ones++
  if (ones === 10) {
    tens++
    ones = 0
    if (tens === 10) {
      hundreds++
      tens = 0
    }
  }
  timerHundreds.innerText = hundreds
  timerTens.innerText = tens
  timerOnes.innerText = ones
}

const minesDown = () => {
  mOnes--
  if (mOnes === -1) {
    mTens--
    mOnes = 9
    if (mTens === -1) {
      mHundreds--
      mTens = 9
    }
  }
  minesHundreds.innerText = mHundreds
  minesTens.innerText = mTens
  minesOnes.innerText = mOnes
  if(mOnes === 0 && mTens === 0 && mHundreds === 0){
    checkWin()
  }
}

const minesUp = () => {
  mOnes++
  if (mOnes === 10) {
    mTens++
    mOnes = 0
    if (mTens === 10) {
      mHundreds++
      mTens = 0
    }
  }
  minesHundreds.innerText = mHundreds
  minesTens.innerText = mTens
  minesOnes.innerText = mOnes
}


newGame()


