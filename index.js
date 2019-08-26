let game = []
const difficulty = document.querySelector('select')
const remaining = document.querySelector('.mines-count-hold')
let mines = null

const newGame = () => {
  game = []
  const playArea = document.getElementById('play-area')
  playArea.innerHTML = ''
  playArea.classList = ''
  if (difficulty.value === 'easy') {
    mines = 10
    remaining.innerText = mines
    playArea.classList.add('easy')
    getSquares(81)

    getMines(10, game.length)



    game.forEach(element => {
      playArea.append(element)
    })
  } else if (difficulty.value === 'medium') {
    mines = 40
    remaining.innerText = mines
    playArea.classList.add('medium')
    getSquares(256)

    getMines(40, game.length)

    game.forEach(element => {
      playArea.append(element)
    })
  } else if (difficulty.value === 'hard') {
    mines = 99
    remaining.innerText = mines
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
    newSquare.innerText = id
    newSquare.addEventListener('auxclick', (e) => {
      mines--
      remaining.innerText = mines
      newSquare.classList.add('flag-square')
      newSquare.removeEventListener('click', lose)
      newSquare.innerHTML = `<img class='flag' src='./Assets/flag.png' />`
      if (mines === 0) {
        let mineSquares = document.getElementsByClassName('mine-square')
        let flagSquares = document.getElementsByClassName('flag-square')
        for (let i = 0; i < mineSquares.length; i++) {
          if (+mineSquares[i].id !== +flagSquares[i].id) {
            alert('Wrong')
            break
          }
        }
        alert('You win')
      }
    })
    newSquare.addEventListener('click', (e) => {
      click(+e.srcElement.id)
    })
    game.push(newSquare)
    id++
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
    square.innerHTML = `<img class='mine' src='./Assets/mine.ico' />`
  })

  return minesIndex
}

const click = (id, callingSquare) => {
  // console.log(`ID: ${id}`)
  let num = 0
  let square = document.getElementById(id)
  let checks
  square.classList.add('clicked')

  switch (difficulty.value) {
    case 'easy':
      checks = getChecks('easy', id)
      break;
    case 'medium':
      checks = getChecks('medium', id)
      break
    case 'hard':
      checks = getChecks('hard', id)
    default:
      return 'error'
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

  // checks.squareChecks.forEach(element => {
  //   if (num === 0 && element && !element.classList.contains('clicked')) {
  //     click(+element.id, +id)
  //   }
  // })

  // if (num !== 0) {
  //   square.innerText = num
  // }
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
      break;

      //DEFAULT
      // squareChecks.push(game[id - 1], game[id + 1], game[id - 30], game[id + 30])
      // corners.push(game[id - 31], game[id - 29], game[id + 29], game[id + 31])
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
            squareChecks.push(game[id + 1], game[id - 16], game[id + 16])
            corners.push(game[+id - 15], game[+id + 17])
          } else if (hardRight.includes(+id)) {
            squareChecks.push(game[id - 1], game[id - 16], game[id + 16])
            corners.push(game[+id - 17], game[+id + 15])
          } else if (hardTop.includes(+id)) {
            squareChecks.push(game[+id - 1], game[+id + 1], game[+id + 16])
            corners.push(game[+id + 17], game[+id + 15])
          } else if (hardBottom.includes(+id)) {
            squareChecks.push(game[+id - 1], game[+id + 1], game[+id - 16])
            corners.push(game[+id - 17], game[+id - 15])
          } else {
            squareChecks.push(game[id - 1], game[id + 1], game[id - 16], game[id + 16])
            corners.push(game[id - 17], game[id - 15], game[id + 15], game[id + 17])
          }
      }

      break
    default:
      return 'error'
  }

  console.log(corners)

  return {
    squareChecks,
    corners
  }
}

const lose = () => {
  alert('lose')
  game = []
  newGame()
}


newGame()


