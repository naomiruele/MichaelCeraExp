let ceraX = 0
let ceraY = 0

const image = new Image(379, 659)
const aspectRatio = image.height / image.width
const scaledWidth = 100
const scaledHeight = 100 * aspectRatio
let windowWidth = document.body.clientWidth
let windowHeight = document.body.clientHeight
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
    ceraX = Math.random() * windowWidth
    ceraY = Math.random() * windowHeight
}

const onTimerTick = () => {
    updateState()
    drawState()
}

const drawState = () => {
    context.drawImage(image, ceraX, ceraY, scaledWidth, scaledHeight)
}


window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas')
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    context = canvas.getContext('2d')
    image.addEventListener('load', () => {
        // draw the image to the canvas
        init()
    })
    image.src = './cera-prancing.png'
})