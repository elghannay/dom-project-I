const apiKey = 'd5c3d21e';

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            s: searchTerm
        }
    })
    // in case we search for an invalid term.
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
}

let div = document.createElement('div');

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    for (const movie of movies) {
        div.innerHTML += `
        <img src ="${movie.Poster}">
        <h1>${movie.Title}</h1> `
    }
}
const target = document.querySelector('#target');
target.appendChild(div);
const input = document.querySelector('input');
input.addEventListener('input', debounce(onInput, 500));