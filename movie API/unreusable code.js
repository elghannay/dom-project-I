/* un reusable code example, in case we want to use the same auto
complete widget on another project that works with a recipe api we
need to go through the code line by line and adjust it accordingly   */


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

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label for="input"><b>search for a movie</b></label>
    <input id="input" class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `;

const input = document.querySelector('.input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    dropdown.classList.add('is-active');
    resultsWrapper.innerHTML = '';

    for (const movie of movies) {

        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        const option = document.createElement('a');
        option.classList.add('dropdown-item');

        option.innerHTML = `
        <img src ="${imgSrc}">
            ${movie.Title} `;
        resultsWrapper.appendChild(option);

        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        })
    }
}
document.addEventListener('click', event => {
    if (!root.contains(event.target))
        dropdown.classList.remove('is-active');
})

onMovieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            i: movie.imdbID
        }
    })
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}

const movieTemplate = movieDetail => {
    return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

input.addEventListener('input', debounce(onInput, 500));