document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid')
    let squares = (document.querySelectorAll(".grid div"))
    const ScoreDisplay = document.querySelector("#score")
    const StartBtn = document.querySelector("#start-button")
    const width = 10
 
    //Shapes of Terominoes

    const LTerominoes = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width*2, width*2+2], 
        [1, width+1, width*2+1, width+2]
        [width, width+2, width*2+1, width*2+2]
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
    let speed = 1000
    
    timerId = setInterval(moveDown, speed)

    function moveDown () {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze tetrominoes
    function freeze() {
        if (current.some (index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach(index => squares[currentPosition + index].classList.add("taken"))
            randomS = Math.floor(Math.random() *theTerominoes.length)
            current = theTerominoes[randomS][0]
            currentPosition = 4
            draw()
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
        speed -= 100
    }
})