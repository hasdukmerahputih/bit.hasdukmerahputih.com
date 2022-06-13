const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');
const inputUrl = document.querySelector('.input-url');
const shortenContainer = document.querySelector('.shorten-output');



hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// API

const Shorten_API = 'https://api.shrtco.de/v2/shorten?url=';
const form = document.querySelector('.form');


async function getUrl(url) {
    shortenContainer.innerHTML = '';

    const response = await fetch(url);
    const data = await response.json();

    showShortenUrl(data.result);
}

function showShortenUrl(url) {
    const { full_short_link2, original_link } = url;

    const linkCard = document.createElement('div');
    linkCard.classList.add('links');

    linkCard.innerHTML = `
        <p class="input-link">${original_link}</p>
        <div class="shorten">
            <p class="shorten-link">${full_short_link2}</p>
            <button id="copy" class="copy">Copy</button>
        </div>
    `;

    shortenContainer.appendChild(linkCard);
    const copy = linkCard.querySelector('.copy');

    copy.addEventListener('click', (e) => {
        e.preventDefault();

        const btn = e.target;
        console.log(btn);
        btn.style.backgroundColor = 'rgb(53, 50, 62)';
        btn.style.color = 'white';
        btn.innerText = 'Copied';
    });

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const small = form.querySelector('small');
    const getValueInput = inputUrl.value.trim();

    if (getValueInput && getValueInput !== '') {
        getUrl(Shorten_API + getValueInput);

        inputUrl.value = '';
    } else {
        form.className = 'form error';
        small.innerText = 'Please add a link';
    }
});
