
const nav = document.querySelector('.nav')

const add = 150

window.addEventListener('scroll', () => {


    if (window.scrollY > nav.offsetHeight + add) {
        nav.classList.add('move')
    } else {
        nav.classList.remove('move')
    }
})