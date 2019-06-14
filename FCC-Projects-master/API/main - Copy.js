var searchBox = document.querySelector("#search");
var ul = document.querySelector("#demo");
var paginate = document.querySelector(".paginate");

var arrayText = [];
var html = "";
var li = document.getElementsByClassName("list-item");
var listTitle = document.getElementsByClassName("title");
var page = 1;

//load request
var load = () => {
  var xhr = new XMLHttpRequest();
  var api_key = "e0a2e02905a8a197ce79913b80c65105";
  var url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}&region=us`;

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var text = JSON.parse(xhr.responseText);
      arrayText.push(text.results);

      text.results.forEach(result => {
        creatItems(result.poster_path, result.vote_average);
      });
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

load();

searchBox.addEventListener("keyup", searchMovie);

//search function
function searchMovie(e) {
  const text = e.target.value.toLowerCase();

  for (let i = 0; i < arrayText[0].length; i++) {
    console.log(arrayText[0][i].title.toLowerCase());
    if (arrayText[0][i].title.toLowerCase().indexOf(text) != -1) {
      li[i].style.display = "block";
      setTimeout(() => {
        li[i].style.opacity = "1";
      }, 150);
    } else {
      li[i].style.opacity = "0";
      setTimeout(() => {
        li[i].style.display = "none";
      }, 150);
    }
  }
}

//create HTML items
var creatItems = (poster, voteCount) => {
  var imageUrl = `https://image.tmdb.org/t/p/original${poster}`;

  html += `<li class="list-item">
            <img src="${imageUrl}" alt="image" class="poster">
           <p class="vote">${voteCount}</p>
           </li>`;
  ul.innerHTML = html;
};

//create pagination
var pageItems = "";
var pages = document.getElementsByClassName("pages");

var createPages = num => {
  pageItems += `<list class="pages">${num}</list>`;
  paginate.innerHTML = pageItems;
};
// create a page of 10
for (let i = 1; i <= 10; i++) {
  createPages(i);
}
// click event in pages
Array.from(pages).forEach(num => {
  num.addEventListener("click", changePage);
});

function changePage() {
  page = this.innerHTML;
  html = "";
  arrayText = [];
  load();
}

var action = document.querySelector("#action");

action.addEventListener("click", showAction);
function showAction() {
  for (let i = 0; i < arrayText[0].length; i++) {
    var x = [];
    x.push(arrayText[0][i]);

    x.forEach(num => {
      if (num.genre_ids.includes(28)) {
        li[i].style.display = "block";
        setTimeout(() => {
          li[i].style.opacity = "1";
        }, 150);
      } else {
        li[i].style.opacity = "0";
        setTimeout(() => {
          li[i].style.display = "none";
        }, 150);
      }
    });
    // if (arrayText[0][i].title.toLowerCase().indexOf(text) != -1) {

    // } else {

    // }
  }
}
