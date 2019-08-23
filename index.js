let game = []

const newGame = () => {
  game = []
  const playArea = document.getElementById('play-area')
  playArea.innerHTML = ''
  playArea.classList = ''
  const difficulty = document.querySelector('select')
  if (difficulty.value === 'easy') {
    playArea.classList.add('easy')
    getSquares(81)

    getMines(10, game.length)



    game.forEach(element => {
      playArea.append(element)
    })
  } else if (difficulty.value === 'medium') {
    playArea.classList.add('medium')
    getSquares(256)

    getMines(40, game.length)



    game.forEach(element => {
      playArea.append(element)
    })
  } else if (difficulty.value === 'hard') {
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
    newSquare.addEventListener('auxclick', (e) => {
      newSquare.classList.add('flag-square')
      newSquare.removeEventListener('click', lose)
      newSquare.innerHTML = `<img class='flag' src='./Assets/flag.png' />`
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

const lose = () => {
  alert('lose')
  game = []
  newGame()
}


newGame()
