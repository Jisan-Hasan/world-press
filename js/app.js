


// fetch categories form api
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error));
}

// Display categories
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    // categoriesContainer.innerHTML = ``;
    categories.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            ${category.category_name}
        `;
        categoriesContainer.appendChild(categoryDiv);
    })
}


loadCategories();



// Load News based on Category
const loadNews = category => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, category));
}


const displayNews = (allNews, category) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    const newsCount = document.getElementById('news-count');
    let count = 0;

    // sort news based on view
    allNews.sort((a, b) => {
        return b.total_view - a.total_view;
    })
    allNews.forEach(news => {
        // console.log(news);
        count++;
        const newsDiv = document.createElement('div');
        newsDiv.className = "card mb-3 bg-white p-4";
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 700)}...</p>
                    <div class="d-flex justify-content-between mt-4 align-self-end">
                        <div class="d-flex gap-2">
                            <img  style="width: 40px; height: 40px; border-radius: 50%;" src="${news.author.img}" alt="">
                            <p>${news.author.name}</p>
                        </div>
                        <div class="d-flex gap-2">
                            <p><i class="fa-regular fa-eye"></i></p>
                            <p>${news.total_view}</p>
                        </div>
                        <div>
                            <p><i class="fa-solid fa-arrow-right-long"></i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })


    // Update category Count
    let categoryName;
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => findCategoryName(data.data.news_category, category))
        .catch(error => console.log(error))

    const findCategoryName = (allCategories, categoryId) => {
        allCategories.forEach(c => {
            if(c.category_id === categoryId){
                if(count === 0){
                    newsCount.innerText = `No news found for category ${c.category_name}`;
                } else{
                    newsCount.innerText = `${count} item found for category ${c.category_name}`;
                }
            }
        })
    }
    
}


// catch category id & call load news
document.getElementById('categories-container').addEventListener('click', (e) => {
    const selectCategory = e.target.innerText;
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => callLoadNewsByCategory(selectCategory, data.data.news_category))
        .catch(error => console.log(error))
});

const callLoadNewsByCategory = (selectCategory, categories) => {
    categories.forEach(category => {
        // console.log(category);
        if(category.category_name === selectCategory){
            loadNews(`${category.category_id}`);
        }
    })
}




loadNews('01');



// Test Section
// const testImg = () => {
    
//     fetch('https://openapi.programming-hero.com/api/news/category/01')
//         .then(res => res.json())
//         .then(data => displayImg(data.data[0]))

// }

// const displayImg = data => {
//     const imgSection = document.getElementById('test');
//     console.log(data)
//     imgSection.innerHTML = `
//             <img  src="${data.author.img}" alt="">
//         `;
    
// }


// testImg();