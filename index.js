const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const image = new Image()
image.addEventListener('load', () => {
    // draw the image to the canvas
    const aspectRatio = image.height / image.width
    const scaledWidth = 100
    const scaledHeight = 100 * aspectRatio
    const xPosition = 0
    const yPosition = 0
    context.drawImage(image, xPosition, yPosition, scaledWidth, scaledHeight)
})
image.src = './cera-prancing.png'



