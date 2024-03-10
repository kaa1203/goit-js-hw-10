import { fetchBreeds, fetchCatByBreeds } from "./cat-api";

const select = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

error.classList.add("is-hidden");

function chooseBreed() {
    select.classList.add("is-hidden");
    loader.classList.replace("is-hidden", "loader");
    fetchBreeds()
        .then(data => {
            let option = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join("");
            select.insertAdjacentHTML("beforeend", option);
            select.classList.remove("is-hidden");
            loader.classList.replace("loader", "is-hidden");
        })
        .catch(onError);
}

chooseBreed();
select.addEventListener("change", onChange);

function onChange(e) {
    loader.classList.replace("is-hidden", "loader");
    catInfo.classList.add("is-hidden");
    let breedId = e.target.value;
    fetchCatByBreeds(breedId)
    .then(data => {
        const { url, breeds } = data[0];
        const { name, description, temperament } = breeds[0];
        
        catInfo.innerHTML = `
            <img src="${url}" alt="${name}" width="400" height="400">
            <div class="box">
                <h2 class="title">${name}</h2>
                <p>${description}</p>
                <h6 class="subtitle">Temperament:</h6>
                <span>${temperament}</span>
            </div>
        `;
        loader.classList.replace("loader", "is-hidden");
        catInfo.classList.remove("is-hidden");
        })
        .catch(onError);
}

function onError() {
    if (!error.classList.contains("is-hidden")) {
        loader.classList.remove("is-hidden");
    } else {
        loader.classList.add("is-hidden");
        error.classList.remove("is-hidden");
    }
}