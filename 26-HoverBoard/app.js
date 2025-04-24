const container = document.getElementById("container");

const softColors = [
    '#ff5733', '#ffbd33', '#ff33d0', '#33ff57', '#33d0ff',
    '#d033ff', '#f9d033', '#33ffda', '#ff3341', '#ff8033',
    '#f5e433', '#ff33a6', '#33d9ff', '#9b33ff', '#ff5c33',
    '#33ff91', '#ff7b33', '#ff33b3', '#33ff66', '#ff9533',
    '#ff33c7', '#33f5ff', '#ff6f33', '#ff3333', '#ff7b80',
    '#b833ff', '#33f7d1', '#ff6666', '#f6ff33', '#33ffbb'
];

const squares = 800;
for (let i = 0; i < squares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () => setColor(square));
    square.addEventListener('mouseout', () => removeColor(square));

    container.appendChild(square);
}

function setColor(div) {
    const randomColor = getRandomColor();
    div.style.backgroundColor = randomColor;
    div.style.boxShadow = `0 0 2px ${randomColor}, 0 0 2px ${randomColor}`;
}

function removeColor(div) {
    div.style.backgroundColor = 'black';
    div.style.boxShadow = '0 0 2px #001788'
}

function getRandomColor() {
    return softColors[Math.floor(Math.random() * softColors.length)];
}
