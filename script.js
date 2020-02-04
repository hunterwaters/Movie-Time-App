function fetchMovies(searchTerm) {
  let apiKey1 = '45da40da';
  let url1 = `https://www.omdbapi.com/?t=${searchTerm}&apikey=${apiKey1}`;



  fetch(url1)
    .then(response => {
      if (response.ok) {
        return response.json();
      }



      throw new Error("Something went wrong.");
    })
    .then(responseJSON => {
      displayResults(responseJSON);

    });

}


function fetchVideos(searchTerm) {
  let apiKey2 = 'AIzaSyAhsXRPYpzuoT3paH4__St1ah8tiExfRSk'

  let url2 = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm} + "original" + "movie" + &key=${apiKey2}
`

  fetch(url2)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Something Went Wrong!');
    })
    .then(responseJSON => {
      displayResults2(responseJSON);
    });

}

function displayResults2(responseJSON) {
  for (let i = 0; i < responseJSON.items.length; i++) {


    $('.video-results').empty();

    $('.video-results').append(`
      <div class = "container2">
      <h2>Watch a Trailer!!</h2>
        <h3>${responseJSON.items[i].snippet.title}</h3>
        <h4>${responseJSON.items[i].snippet.description}</h4>
        <iframe src = "https://www.youtube.com/embed/${responseJSON.items[i].id.videoId}" align = "middle" ></iframe>
        </div>
`)
  }
}


function displayResults(responseJSON) {
  if (responseJSON.Response == "False") {
    return ("Sorry! No Results!");
  }
  $('.movie-results').empty();


  $('.movie-results').append(` 
          <div class = "container">
          <h2>${responseJSON.Title}</h2>
          <h3>${responseJSON.Year}</h3>
          <h4>${responseJSON.Actors}</h4>
          <img  src="${responseJSON.Poster}" class = "poster" width = "20" />
          <h4>${responseJSON.Genre}</h4>
          </div>
          
              
        `)


}

function watchForm() {
  $('.js-search-form').on('submit', (event) => {
    event.preventDefault();



    let searchTerm = $('#query').val();

    fetchMovies(searchTerm);
    fetchVideos(searchTerm);
  })
}




$(watchForm);