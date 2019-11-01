let windowWidth = document.body.clientWidth
let windowHeight = document.body.clientHeight
const ceraWidth = 379
const ceraHeight = 659
let ceraX = windowWidth / 2
let ceraY = windowHeight / 2
let vx = 1
let vy = 1
let ax = 2
let ay = 2
let mouseX
let mouseY

const image = new Image(ceraWidth, ceraHeight)
const imageFlipped = new Image(ceraWidth, ceraHeight)
const aspectRatio = image.height / image.width
const scaledWidth = 100
const scaledHeight = 100 * aspectRatio

let canvas
let context
let interval

const init = () => {
    // window is loaded, image src is loaded, we're good to go!
    drawState()

    document.getElementById('stop').addEventListener('click', () => {
        clearInterval(interval)
        interval = null
    })
    
    document.getElementById('start').addEventListener('click', () => {
        if(!interval) {
            interval = setInterval(onTimerTick, 33) // 30 frames per second
        }
    })
    window.addEventListener('mousemove', (event) => {
      mouseX = event.pageX
      mouseY = event.pageY  
    })
}

const updateState = (collision) => {

    const ceraCenterX = ceraX + (0.5 * scaledWidth)
    const ceraCenterY = ceraY + (0.5 * scaledHeight)
    if (collision) {
        if (mouseX < ceraCenterX) {
            vx = 20
        }
        if (mouseX >= ceraCenterX) {
            vx = -20
        }
        if (mouseY < ceraCenterY) {
            vy = 20
        }
        if (mouseY >= ceraCenterY) {
            vy = -20
        }
    }

    const sign = Math.random() > 0.5 ? -1 : 1
    vx = vx + (sign * (Math.random() * ax))
    vy = vy + (sign * (Math.random() * ay))
    if (ceraX <= 0){
        vx = 10
    }
    if (ceraY <= 0){
        vy = 10
    }
    if (ceraX >= windowWidth - scaledWidth){
        vx = -10
    }
    if (ceraY >= windowHeight - scaledHeight){
        vy = -10
    }

    ceraX = ceraX + vx
    ceraY = ceraY + vy
    
}

const onTimerTick = () => {
    const c = detectCollision()
    updateState(c)
    drawState(c)
}

const drawState = (collision) => {
    if(collision) {
        // image.style.Transform = "rotate(90deg)";
        // imageFlipped.style.Transform = "rotate(90deg)";
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(vx >= 0){
        context.drawImage(image, ceraX, ceraY, scaledWidth, scaledHeight)
    } else {
        context.drawImage(imageFlipped, ceraX, ceraY, scaledWidth, scaledHeight)
    }
    // if(collision) {
    //     context.beginPath()
    //     context.arc(mouseX, mouseY, 50, 0, 2 * Math.PI)
    //     context.stroke()
    // }
    
}

const detectCollision = () => {
    const mouseXInCeraX = mouseX >= ceraX && mouseX <= (ceraX + scaledWidth)
    const mouseYInCeraY = mouseY >= ceraY && mouseY <= (ceraY + scaledHeight)
    if (mouseXInCeraX && mouseYInCeraY){
        return true
    }
    return false
}

window.addEventListener('load', () => {
    canvas = document.getElementById('canvas')
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    context = canvas.getContext('2d')
    image.addEventListener('load', () => {
        // draw the image to the canvas
        imageFlipped.src = './cera-prancing-flipped.png'
        imageFlipped.addEventListener('load', () => {
            init()
        })
        
    })
    image.src = './cera-prancing.png'
})
