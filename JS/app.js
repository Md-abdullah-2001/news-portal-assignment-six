// categories data
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.news_category);
  displayCategories(data.data.news_category);
};

const displayCategories = (categories) => {
  // console.log(categories);

  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    // console.log(category);

    const createList = document.createElement("li");
    createList.innerHTML = `
    <a onclick="categoryDetails('${category.category_id}')" class=' text-decoration-none fw-bold' href='#'>${category.category_name}
    `;
    categoryContainer.appendChild(createList);
  });
};
loadCategories();

const categoryDetails = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  newsCard(data.data);
};

const newsCard = (cards) => {
  const notFoundMsg = document.getElementById("none-msg");
  if (cards.length === 0) {
    notFoundMsg.classList.remove("d-none");
  } else {
    notFoundMsg.classList.add("d-none");
  }
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";

  cards.forEach((card) => {
    console.log(card);
    const createNewsDiv = document.createElement("div");
    createNewsDiv.classList.add("w-100");
    createNewsDiv.innerHTML = `
    <div class="col g-0  d-flex gap-4 ">
                        <div class="col-md-4 gap-4 ">
                            <img src="${
                              card.image_url
                            }" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body ">
                                <h5 class="card-title">${card.title}</h5>
                              <p class="card-text">${
                                card.details.length > 280
                                  ? card.details.slice(0, 280) + "..."
                                  : card.details
                              }</p>
                            
                            
                            <div class ="d-flex gap-5">

                           <div class="d-flex gap-3">  <img src="${
                             card.author.img
                           }" class="img-container rounded " alt="..." style="width:35px; heigth:35px">
                         <div> <h6 > ${card.author.name} </h6>
                         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p></div>
                         </div>


                            <div>
                            <p>Total View:${card.total_view}</p>
                            
                            </div>
                            </div>
                           
                    
                             
                            </div>
                        </div>
                    </div>
    `;
    newsContainer.appendChild(createNewsDiv);
  });
};
categoryDetails();
