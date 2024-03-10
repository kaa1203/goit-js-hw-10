const BASE_LINK = "https://api.thecatapi.com/v1";
const API_KEY = "live_luVqfw63wT230fLFa38st6UBiEvFjNNNf5hDIlwm1wLoKCdZNRj8HzV5tfSbMpgo";

export function fetchBreeds() {
    return fetch(`${BASE_LINK}/breeds?api_key=${API_KEY}`).then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        } else {
            return res.json();
        }
    });    
}

export function fetchCatByBreeds(breedId) {
    return fetch(`${BASE_LINK}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        } else {
            return res.json();
        }
    });
}