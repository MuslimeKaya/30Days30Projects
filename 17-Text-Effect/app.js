

const content =  document.getElementById("content");
const speedEl = document.getElementById("speed");

const text = "I am an adventurous explorer who loves discovering nature."
let idx = 1
let speed = 300 / speedEl.value
writeText();
function writeText () {
    content.innerText = text.slice(0, idx)
    idx++

    if(idx > text.length) {
       //content.innerText = text   //yazının bittikten sonra sabit kalmasını sağlıyor.
       idx = 1
    }
    setTimeout(writeText, speed);
};

speedEl.addEventListener("input", (e) => (speed = 300/e.target.value)) 







