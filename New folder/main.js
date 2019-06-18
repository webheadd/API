var searchBox = document.querySelector("#search");
var ul = document.querySelector("#demo");
var paginate = document.querySelector(".pagination");
var page = document.getElementById("page").value;
var prevBtn = document.getElementById("left");
var nextBtn = document.getElementById("right");

var arrayText = [];
var html = "";
var li = document.getElementsByClassName("list-item");
var listTitle = document.getElementsByClassName("title");
var modal = "";


//configs
var api_key = "e0a2e02905a8a197ce79913b80c65105";
//var url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}&region=us`;
var url = "https://api.themoviedb.org/3/";

document.addEventListener("DOMContentLoaded", () => {
    const uri = `${url}movie/popular?api_key=${api_key}&language=en-US&page=1&region=us`;
    load(uri);
    console.log(li.length);
});

//next page
nextBtn.addEventListener('click', function() {
    var searched = searchBox.value;
    
    if(page < 1) page = 1;
    if(page > 9) page = 9;
    
    page++;
    console.log(page);
    var imageUrl = `${url}search/movie?api_key=${api_key}&language=en-US&query=${searched}&page=${page}&include_adult=false`;
    html = "";
    arrayText = [];
    load(imageUrl);
});
prevBtn.addEventListener('click', function() {
    var searched = searchBox.value;
    
    if(page < 1) page = 1;
    if(page > 9) page = 9;
    
    page--;
    console.log(page);
    var imageUrl = `${url}search/movie?api_key=${api_key}&language=en-US&query=${searched}&page=${page}&include_adult=false`;
    html = "";
    arrayText = [];
    load(imageUrl);
});


//movie card clickable






//load request
var load = (queryUrl) => {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var text = JSON.parse(xhr.responseText);
      arrayText.push(text.results);
        
      text.results.forEach(result => {
        creatItems(result.poster_path, result.vote_average, result.id);
        
      });
      Array.from(li).forEach(list => {
          list.addEventListener('click', function () {
            var movieID = this.getAttribute("data-attribute");
            var detailsUrl = `${url}movie/${movieID}?api_key=${api_key}&language=en-US`;
            loadDetails(detailsUrl);
          });
      });
    }
  };
  xhr.open("GET", queryUrl, true);
  xhr.send();
};


//get movie infos
var loadDetails = (queryUrl) => {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var text = JSON.parse(xhr.responseText);
      console.log(text);
    }
  };
  xhr.open("GET", queryUrl, true);
  xhr.send();
};
searchBox.addEventListener("keyup", searchMovie);
//search function
var toUrl;
function searchMovie(e) {
    var text = e.target.value;

    if (text === "") {
        toUrl = `${url}movie/popular?api_key=${api_key}&language=en-US&page=1&region=us`;
        console.log("empty");
    } else {
        toUrl = `${url}search/movie?api_key=${api_key}&language=en-US&query=${text}&page=${page}&include_adult=false`;
        console.log(toUrl);
    }
    html = "";
    arrayText = [];
    load(toUrl);
}

//create HTML items
var creatItems = (poster, voteCount, id) => {
    var imagePoster = `https://image.tmdb.org/t/p/original${poster}`;
    
    html += `<li class="list-item" data-attribute="${id}">
            <img src="${imagePoster}" alt="image" class="poster">
           <p class="vote">${voteCount}</p>
           </li>`;
  
  
    ul.innerHTML = html;
};


