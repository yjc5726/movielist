(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const displayPanel = document.querySelector('.display-panel')
  const nav = document.querySelector('.nav')
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  let movieData = []


  let navHTML = ``
  for (item in genres) {
    navHTML += `
      <li class="nav-item">
        <a class="nav-link" href="#" data-id="${item}">${genres[item]}</a>
      </li>
    `
  }
  nav.innerHTML = navHTML


  axios.get(INDEX_URL)
    .then((response) => {
      movieData = response.data.results
    })
    .catch((err) => console.log(err))

  function displayMovies(data) {
    let contentHTML = ''
    data.forEach(item => {
      contentHTML += `
        <div class="col-4 mb-3">
          <div class="card">
            <img src="${POSTER_URL}${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              ${displayGenres(item.genres)}
            </div>
          </div>
        </div>
      `
    })
    displayPanel.innerHTML = contentHTML
  }

  function displayGenres(array) {
    let genresHTML = ''
    array.forEach(item => {
      genresHTML += `
        <span class="badge badge-secondary">${genres[item]}</span>
      `
    })
    return genresHTML
  }

  function filterOfGenres(number) {
    const Id = Number(number)
    const result = movieData.filter(item => {
      const isGenres = item.genres.some(item => { return item === Id })
      return isGenres
    })
    return result
  }

  nav.addEventListener('click', () => {
    // filter display
    const genresId = event.target.dataset.id
    const filterData = filterOfGenres(genresId)
    displayMovies(filterData)
  })
})()