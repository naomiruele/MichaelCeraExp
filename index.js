let windowWidth = document.body.clientWidth
let windowHeight = document.body.clientHeight
const ceraWidth = 379
const ceraHeight = 659
let ceraX = windowWidth / 2
let ceraY =  windowHeight / 2
let vx = 1
let vy = 1
let ax = 2
let ay = 2

const image = new Image(ceraWidth, ceraHeight)
const aspectRatio = image.height / image.width
const scaledWidth = 100
const scaledHeight = 100 * aspectRatio

let canvas
let context
let interval

const init = () => {
    // window is loaded, image src is loaded, we're good to go!
    drawState()
    interval = setInterval(onTimerTick, 33) // 30 frames per second

    document.getElementById('stop').addEventListener('click', () => {
        clearInterval(interval)
    })
}

const updateState = () => {
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
    updateState()
    drawState()
}

const drawState = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, ceraX, ceraY, scaledWidth, scaledHeight)
}


window.addEventListener('load', () => {
    canvas = document.getElementById('canvas')
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    context = canvas.getContext('2d')
    image.addEventListener('load', () => {
        // draw the image to the canvas
        init()
    })
    image.src = './cera-prancing.png'
})