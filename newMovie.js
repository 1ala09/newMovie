const getMovies = async () => {
    try{
        let MD = localStorage.getItem('mData');
        if (!MD) {
            const moviesDataFetch = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
                headers: {
                    'Accept': 'application/json',
                    'x-rapidapi-key': '8ff3611b4amsh085ebacc3a26629p10dcddjsn4960c7480b87',
                    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            })
            const moviesData = await moviesDataFetch.json();
            localStorage.setItem('mData', JSON.stringify(moviesData));
        }
        
        console.log(JSON.parse(localStorage.getItem('mData')));
        let current_page = 1;
        create_pages(current_page);
              
    }
    catch(error){
        console.log(error);
    }
    
}
getMovies();

function create_pages(current_page){
    const list = JSON.parse(localStorage.getItem('mData'));

    let ul = document.querySelector('.ul');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');


    let total_page = 10;
    let itemsPerPage = 10;
    let active_page = '';

    let startIndex = (current_page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage
    let allMovies = list;
    let tenMovies = allMovies.slice(startIndex, endIndex);

    ul.innerHTML = '';


    let before_page = current_page - 2;
    let after_page = current_page + 2;

    if(current_page == 2){
        before_page = current_page - 1;
    }
    if(current_page == 1){
        before_page =  current_page;
    }
    if(current_page == total_page - 1){
        after_page = current_page + 1;
    }
    if(current_page == total_page){
        after_page = current_page;
    }
    
    for(let i = before_page; i <= after_page; i++){
        if(current_page>=1){
            document.getElementById('movieContainer').innerHTML = '';
        }

        if(current_page==i){
            active_page = 'active_page'
        }
        else{
            active_page = '';
        }
        ul.innerHTML += `<li onclick="create_pages(${i})"><button class="page_number ${active_page}">${i}</button></li>`
    }
    
    prev.addEventListener('click', ()=>{
        current_page--;
        create_pages(current_page);
    })
    if(current_page <= 1){
        prev.style.display = 'none';
    }else{
        prev.style.display = 'block';
    }
    next.addEventListener('click', ()=>{
        current_page++;
        create_pages(current_page);
    })
    if(current_page >= total_page){
        next.style.display = 'none';
    }else{
        next.style.display = 'block';
    }
    tenMovies.map((item)=>{
        const name = item.title;
        const poster = item.image;
        const rating = item.rating;
        const Overview = item.description;
        const year = item.year;
        const genre = item.genre.join(', ');
        const Id = item.id;
        
        const movie = `<li>
            <div class='bg'>
                <img class="hoverPoster" src='${poster}' onclick="findMovieById('${Id}')"></a>
                <h2>${rating}</h2>
                <h2>${name}</h2>
                <img src="info.png" id='info' onclick="showInfo(event)">
            </div>
            <div class="showdescrp">
                <div class="cancel"><button onclick="cancel(event)">x</button></div>
                <div class="top">
                    <div class="poster"><img src='${poster}'></div>
                    <div class="titleCont">
                        <h1>${name}</h1>
                        <h2>${year}</h2>
                        <h2>${genre}</h2>
                        <h2>${rating}/10</h2>
                    </div>
                </div>
                <p></p>
                <div class="description">${Overview}</div>
            </div>
        </li>`
        document.getElementById('movieContainer').innerHTML += movie;
    })   
}

function findMovieById(movieId){
    console.log('Movie ID:', movieId);
    const list = JSON.parse(localStorage.getItem('mData'));
    let result = list.find(obj=>obj.id===movieId)
    localStorage.setItem('resultId', JSON.stringify(result));
    window.location.href = "newNewMovie.html"
}

function showInfo(event) {
    document.getElementById('mainBody').style.opacity = 0.8;
    const movieItem = event.target.closest('li'); 
    const description = movieItem.querySelector('.showdescrp');
    description.style.display = 'block';
}

function cancel(event) {
    document.getElementById('mainBody').style.opacity = 1;
    const movieItem = event.target.closest('li'); 
    const description = movieItem.querySelector('.showdescrp'); 
    description.style.display = 'none';
}






