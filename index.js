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
  square.classList.add('clicked')
  if (difficulty.value === 'easy') {

    //DECIDES WHICH SQUARES TO LOOK AT ON EASY

    let checks = getChecks('easy', id)

    //DECIDES WHICH SQUARES TO LOOK AT ON MEDIUM

    if (difficulty.value === 'medium') {
      const mediumLeft = [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240]
      const mediumRight = [15, 31, 47, 63, 79, 95, 111, 127, 143, 159, 175, 191, 207, 223, 239, 255]
      if (mediumLeft.includes(+id)) {
        squareChecks.push(game[id + 1], game[id - 16], game[id + 16])
        corners.push(game[id + 15], game[id + 17])
      } else if (mediumRight.includes(+id)) {
        squareChecks.push(game[id - 1], game[id - 16], game[id + 16])
        corners.push(game[id + 15], game[id + 17])
      } else {
        squareChecks.push(game[id - 1], game[id + 1], game[id - 16], game[id + 16])
        corners.push(game[id - 17], game[id - 15], game[id + 15], game[id + 17])
      }
    }

    //DECIDES WHICH SQUARES TO LOOK AT ON HARD

    if (difficulty.value === 'hard') {
      const hardLeft = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450]
      const hardRight = [29, 59, 89, 119, 149, 179, 209, 239, 269, 299, 329, 359, 389, 419, 449, 479]
      if (hardLeft.includes(+id)) {
        squareChecks.push(game[id + 1], game[id - 30], game[id + 30])
        corners.push(game[id + 29], game[id + 31])
      } else if (hardRight.includes(+id)) {
        squareChecks.push(game[id - 1], game[id - 30], game[id + 30])
        corners.push(game[id - 31], game[id - 29])
      } else {
        squareChecks.push(game[id - 1], game[id + 1], game[id - 30], game[id + 30])
        corners.push(game[id - 31], game[id - 29], game[id + 29], game[id + 31])
      }
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
            } else if(easyTop.includes(+id)){
              squareChecks.push(game[+id - 1], game[+id + 1], game[+id + 9])
              corners.push(game[+id + 8], game[+id + 10])
            } else if(easyBottom.includes(+id)){
              squareChecks.push(game[+id -1], game[+id + 1], game[+id - 9])
              corners.push(game[+id - 10], game[+id - 8])
            } else {
              squareChecks.push(game[id - 1], game[id + 1], game[id - 9], game[id + 9])
              corners.push(game[id - 10], game[id - 8], game[id + 8], game[id + 10])
            }
        }
        break;
      case 'medium':
        break
      case 'hard':
        break
      default:
        return 'error'
    }

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


