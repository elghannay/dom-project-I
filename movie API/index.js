/* un reusable code example, in case we want to use the same auto
complete widget on another project that works with a recipe api we
need to go through the code line by line and adjust it accordingly   */

const apiKey = 'd5c3d21e';
const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
        <img src ="${imgSrc}">
        ${movie.Title} (${movie.Year}) `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
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
}
autocomplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    onMovieSelect(movie, document.querySelector('#left-summary'),'left');
    document.querySelector('.tutorial').classList.add('is-hidden');
  },
})

autocomplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    onMovieSelect(movie, document.querySelector('#right-summary'),'right');
    document.querySelector('.tutorial').classList.add('is-hidden');
  },
})

let leftMovie;
let rightMovie;

onMovieSelect = async (movie,targetElement,side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            i: movie.imdbID
        }
    })
  targetElement.innerHTML = movieTemplate(response.data);
  if (side == 'left')
    leftMovie = response.data;
  else
    rightMovie = response.data;
  if (rightMovie && leftMovie)
    runComparison();
}

const runComparison = () => {
  
  const leftSideStats = document.querySelectorAll('#left-summary .notification');
  const rightSideStats = document.querySelectorAll('#right-summary .notification');

  leftSideStats.forEach((leftStat, index)=> {
    const rightStat = rightSideStats[index];
    const leftSideValue = leftStat.dataset.value;
    const rightSideValue = rightStat.dataset.value;

    if (leftSideValue > rightSideValue){
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
    else {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    }
  })
}

const movieTemplate = movieDetail => {
  const Awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    let value = parseInt(word);
    if (isNaN(value))
      return prev;
    else
      return prev + value;
  },0);
  const BoxOffice = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
  const Metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
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
    <article data-value=${Awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${BoxOffice} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${Metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

