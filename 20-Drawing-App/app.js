const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const clearBtn = document.getElementById('clear')
const colorInput = document.getElementById('color')
const sizeRange = document.getElementById('size')
const eraserBtn = document.getElementById('eraser')
const pencilBtn = document.getElementById('pencil')
const undoBtn = document.getElementById('undo')

let size = 8
let color = 'black'
let prevColor = 'black'
let x
let y
let isPressed = false
let isEraser = false
let history = []
let currentStep = -1

function saveState() {
  if (currentStep < history.length - 1) {
    history = history.slice(0, currentStep + 1)
  }
  currentStep++
  history.push(canvas.toDataURL())
  
  undoBtn.disabled = false
}

function undo() {
  if (currentStep > 0) {
    currentStep--
    const img = new Image()
    img.src = history[currentStep]
    img.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
  }
  
  if (currentStep <= 0) {
    undoBtn.disabled = true
  }
}

function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()
}

canvas.addEventListener('mousedown', (e) => {
  isPressed = true
  x = e.offsetX
  y = e.offsetY
  
  drawCircle(x, y)
})

canvas.addEventListener('mouseup', (e) => {
  isPressed = false
  x = undefined
  y = undefined
  
  saveState()
})

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY

    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)

    x = x2
    y = y2
  }
})

colorInput.addEventListener('change', (e) => {
  color = e.target.value
  if (!isEraser) {
    prevColor = color
  }
})

increaseBtn.addEventListener('click', () => {
  size += 4
  if (size > 64) size = 64
  updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
  size -= 4
  if (size < 4) size = 4
  updateSizeOnScreen()
})

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  saveState()
})

eraserBtn.addEventListener('click', () => {
  isEraser = true
  prevColor = color
  color = '#f8f9fa'
  
  eraserBtn.classList.add('active')
  pencilBtn.classList.remove('active')
})

pencilBtn.addEventListener('click', () => {
  isEraser = false
  color = prevColor
  
  pencilBtn.classList.add('active')
  eraserBtn.classList.remove('active')
})

undoBtn.addEventListener('click', undo)

function updateSizeOnScreen() {
  sizeRange.textContent = size
}

window.addEventListener('load', () => {
  pencilBtn.classList.add('active')
  undoBtn.disabled = true
  
  saveState()
})