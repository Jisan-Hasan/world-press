


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