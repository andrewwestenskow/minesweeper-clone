let game = []

const newGame = () => {
  game = []
  let id = 0
  const playArea = document.getElementById('play-area')
  playArea.innerHTML = ''
  playArea.classList = ''
  const difficulty = document.querySelector('select')
  if (difficulty.value === 'easy') {
    playArea.classList.add('easy')
    for (let i = 0; i < 81; i++) {
      let newSquare = document.createElement('div')
      newSquare.classList.add('game-square')
      newSquare.id = id
      game.push(newSquare)
      id++
    }

    getMines(10, game.length)

    

    game.forEach(element => {
      playArea.append(element)
    })
  } else if (difficulty.value === 'medium') {
    playArea.classList.add('medium')
    for (let i = 0; i < 256; i++) {
      let newSquare = document.createElement('div')
      newSquare.classList.add('game-square')
      newSquare.id = id
      game.push(newSquare)
      id++
    }

    getMines(40, game.length)

    

    game.forEach(element => {
      playArea.append(element)
    })
  } else if (difficulty.value === 'hard') {
    playArea.classList.add('hard')
    for (let i = 0; i < 480; i++) {
      let newSquare = document.createElement('div')
      newSquare.classList.add('game-square')
      newSquare.id = id
      game.push(newSquare)
      id++
    }

    getMines(99, game.length)

    

    game.forEach(element => {
      playArea.append(element)
    })
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
    square.addEventListener('click', () => lose())
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
