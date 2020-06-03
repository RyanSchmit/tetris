document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid')
    let squares = (document.querySelectorAll(".grid div"))
    const scoreDisplay = document.querySelector("#score")
    const startBtn = document.querySelector("#start-button")
    const width = 10
 
    //Shapes of Terominoes

    const LTerominoes = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const ITerominoes = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const ZTerominoes = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const TTerominoes = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const SQTerominoes =  [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
    ]

    const theTerominoes = [SQTerominoes, TTerominoes, ZTerominoes, ITerominoes, LTerominoes]

    let currentPosition = 4
    

    //selecting random terminoes
    let currentRotation = 0
    let randomS = Math.floor(Math.random() *theTerominoes.length)
    let current = theTerominoes[randomS][currentRotation];



    //drawing tetrominoes 
    function draw() {
        current.forEach( index => {
            squares[currentPosition + index].classList.add("tetromino")
        })
    }
    
    draw()

    function undraw() {
        current.forEach( index => {
            squares[currentPosition + index].classList.remove("tetromino")
        })
    } 

    //keycodes to functions 
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        }
        if (e.keyCode === 39) {
            moveRight()
        }
        if (e.keyCode === 40) {
            fallFast()
        }
        if (e.keyCode === 38){
            rotate()
        }
    }
    
    document.addEventListener("keyup", control)

    //moving tetrominoes down
    var speed = 500
    
    let timerId 
    let score = 0

    function moveDown () {
        undraw()
        currentPosition += width
        draw()
        freeze()
        gameOver()
    }

    //freeze tetrominoes
    function freeze() {
        if (current.some (index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => squares[currentPosition + index].classList.add("taken"))
            randomS = Math.floor(Math.random() *theTerominoes.length)
            current = theTerominoes[randomS][0]
            currentPosition = 4
            draw()
            addScore()
        }
    }

    //moving tetrominoes left and right
    function moveLeft () {
        undraw()
        const leftEdge = current.some(index => (currentPosition + index) % width === 0)
        
        if(!leftEdge) currentPosition -=1
        
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }
        draw()
}

    function moveRight() {
        undraw()
        const rightEdge = current.some(index => (currentPosition + index) % width === width -1)
        
        if(!rightEdge) currentPosition +=1
        
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        draw() 
    }

    //rotate tetrominoes

    function rotate() {
        undraw()
        currentRotation ++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTerominoes[randomS][currentRotation]
        draw()
    }

    //speed up falling 
    function fallFast() {
        speed = 100
    }

    //start button function
    startBtn.addEventListener("click", () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, speed)
        }
    })

    //adding score 
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row =  [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if (row.every(index => squares[index].classList.contains("taken"))) {
                score += 10
                scoreDisplay.innerHTML = score 
                row.forEach(index => {
                    squares[index].classList.remove("taken")
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
            
        }
    }

    //end game
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
            alert("Game Over")
            clearInterval(timerId)
        }
    }
    console.log(speed)
})