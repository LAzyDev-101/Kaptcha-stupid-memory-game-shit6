document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]


  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
  const delayInMilliseconds = 1000; //1 second

  function resetBoard() {
    cardsWon = []
    cardArray.sort(() => 0.5 - Math.random())
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.getElementById(`img-${i}`)
      card.setAttribute('src', cardArray[i].img)
      card.setAttribute('id', `img-${i}`)
    }
    hiddenBoard(delayInMilliseconds)
  }

  function hiddenBoard(delayInMilliseconds) {
    setTimeout(function () {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.getElementById(`img-${i}`)
        card.setAttribute('src', 'images/blank.png')
        card.addEventListener('click', flipCard)
      }
    }, delayInMilliseconds);
  }

  function createBoard() {
    cardArray.sort(() => 0.5 - Math.random())
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', cardArray[i].img)
      card.setAttribute('id', `img-${i}`)
      grid.appendChild(card)

    }

    hiddenBoard(delayInMilliseconds)

  }

  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      // alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      alert('Sorry, try again')
      resetBoard()
    }

    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      //TODO: post request on finish
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  function flipCard() {
    let cardId = this.getAttribute('id')
    const arrID = cardId.split("img-")
    cardId = arrID[arrID.length - 1]
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }


  createBoard()
})
