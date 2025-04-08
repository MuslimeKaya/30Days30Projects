const container = document.querySelector('.container')
const imageCount = 12 

for (let i = 1; i <= imageCount; i++) {
  const img = document.createElement('img')
  img.src = `images/image${i}.jpg` 
  img.alt = `2021 anısı ${i}`

  
  container.appendChild(img)
}