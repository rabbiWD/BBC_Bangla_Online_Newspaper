// promise -> pending, resolve(success), reject(error)
const categoryContainer = document.getElementById('category-container')
const newsContainer = document.getElementById('newsContainer')

// Category section
const loadCategory = () =>{
    fetch('https://news-api-fs.vercel.app/api/categories') //promise
   .then(res => res.json()) //response -- promise
   .then(data =>{
    console.log(data.categories);
    // DOM e dekhanor jnno
    const categories = data.categories
    // console.log(categories);
    showCategory(categories)
   })
   .catch(err=>{
    console.log(err);
   });
 };
// display calegory section 
 const showCategory =(categories)=>{
     categories.forEach(cat => {
        categoryContainer.innerHTML += `
        <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 ${cat.title == 'মূলপাতা' && 'border-b-4'} cursor-pointer">${cat.title}</li>
        `
    });

    categoryContainer.addEventListener('click',(e)=>{
      // then red indicator remove korlam
      const allLi = document.querySelectorAll('li')
      allLi.forEach(li=>{
        li.classList.remove('border-b-4')
      })
      // red indicator fixed korlam
      if(e.target.localName === 'li'){
        // console.log(e.target);
        e.target.classList.add('border-b-4')
        loadNewsByCategory(e.target.id)
      }
    })
 }
// News Category section
 const loadNewsByCategory = (categoryId)=>{
  console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
  .then(res => res.json())
  .then(data=>{
    // console.log(data.articles);
    showNewsByCategory(data.articles)
  })
  .catch(err=>{
    console.log(err);
  })
 }
// display news category section
 const showNewsByCategory = (articles)=>{
  console.log(articles);
  newsContainer.innerHTML = ""
  articles.forEach(article =>{
    newsContainer.innerHTML += `
    <div>
      <div>
        <img src ="${article.image.srcset[5].url}">
      </div>
       <div class= "p-2">
         <h1 class="font-bold">${article.title}</h1>
        <p class="text-sm">${article.time}</p>
       </div>
    </div>
    `
  })
 }

  loadCategory();
  loadNewsByCategory('main')

//  bikolpo system tryCatch
// const loadCategoryAsync = async () =>{
//     try {
//          const res = await fetch('https://news-api-fs.vercel.app/api/categories')
//         const data = await res.json()
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
   
// }
