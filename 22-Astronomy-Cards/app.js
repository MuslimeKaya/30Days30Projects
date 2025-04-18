const nasa_container = document.querySelector('.nasa-container')
const searchBtn = document.querySelector('.searchBtn');
const searchContainer = document.querySelector('.search');
const searchInput = document.querySelector('.searchInput');

const nasa_count = 20

const bg_color = {
    Mercury: "#b5b5b5",
    Venus: "#e5c07b",
    Earth: "#3caea3",
    Mars: "#e04e39",
    Jupiter: "#d9a066",
    Saturn: "#f0c987",
    Uranus: "#7fdbff",
    Neptune: "#4169e1",
    Pluto: "#aaa9ad",
    Moon: "#c0c0c0",
    Sun: "#ffd700",
    Galaxy: "#6b5b95",
    Default: "#333"
};

searchBtn.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    searchInput.focus();
});

searchInput.addEventListener('input', (e) => {
    const searchValue = searchInput.value.toLowerCase()
    const nasaNames = document.querySelectorAll('.nasa-name')
    
    nasaNames.forEach((nasaName) => {
        nasaName.parentElement.parentElement.style.display = 'block'
        if (!nasaName.innerHTML.toLowerCase().includes(searchValue)) {
            nasaName.parentElement.parentElement.style.display = 'none'
        }
    })
})

const fetchNasas = async() => {
    for(let i=1; i<nasa_count; i++){
        await getNasa(i)
    }
}

const getNasa = async (id) => {
    try {
        const url = `https://swapi.py4e.com/api/planets/${id}`;
        const res = await fetch(url)
        const data = await res.json()
        console.log(data);
        createNasaCard(data)
    } catch (error) {
        console.error(`ID ${id} için hata:`, error);
    }
}
const createNasaCard = (planet) => {
    const nasaDiv = document.createElement('div')
    nasaDiv.classList.add('nasa')
    
    const planetId = planet.url.split('/')[5]
    const planetName = planet.name
    const planetType = getPlanetType(planet.climate)
    
    const planetBg = bg_color[planetType] || bg_color.Default
    nasaDiv.style.backgroundColor = `${planetBg}`
    
    const nasaInnerHTML = `
        <div class="image-container">
            <img src="https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg" 
                 alt="${planetName}" 
                 onerror="this.src='https://apod.nasa.gov/apod/image/2504/LRGB_final_corrected1024.jpg'">
        </div>
        <div class="nasa-info">
            <span class="nasa-id">#${planetId.toString().padStart(3, '0')}</span>
            <h3 class="nasa-name">${planetName}</h3>
            <div class="small">
                <small class="nasa-exp"><i class="fa-solid fa-flask-round-potion"></i> <span>${planet.diameter} km</span></small>
                <small class="nasa-weight"><i class="fa-solid fa-flask-round-potion"></i> <span>${planet.population !== "unknown" ? planet.population : "Bilinmiyor"}</span></small>
            </div>
            <div class="nasa-type">
                <i class="fa-brands fa-uncharted"></i> <span>${planetType}</span>
            </div>
        </div>
    `
    
    nasaDiv.innerHTML = nasaInnerHTML
    nasa_container.appendChild(nasaDiv)
}

const getPlanetType = (climate) => {
    if (!climate) return "Default"
    if (climate.includes("arid")) return "Mars"
    if (climate.includes("temperate")) return "Earth"
    if (climate.includes("frozen")) return "Pluto"
    if (climate.includes("hot")) return "Venus"
    if (climate.includes("tropical")) return "Jupiter"
    if (climate.includes("murky")) return "Neptune"
    if (climate.includes("humid")) return "Saturn"
    if (climate.includes("rocky")) return "Mercury"
    if (climate.includes("frigid")) return "Uranus"
    if (climate.includes("moist")) return "Moon"
    return "Default"
}

fetchNasas()