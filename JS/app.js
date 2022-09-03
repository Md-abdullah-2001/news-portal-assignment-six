// categories data
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.news_category);
  displayCategories(data.data.news_category);
};

const displayCategories = (categories) => {
  console.log(categories);
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    // console.log(category);
    const createList = document.createElement("li");
    createList.innerHTML = `
    <a onclick="categoryDetails('${category.category_id}')" class='text-decoration-none fw-bold' href='#'>${category.category_name}
    `;
    categoryContainer.appendChild(createList);
  });
};
loadCategories();

const categoryDetails = async (id) => {
  const url = "https://openapi.programming-hero.com/api/news/category/'${id}'";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  newsCard(data.data);
};

const newsCard = (cards) => {
  const newsContainer = document.getElementById("news-container");
  cards.forEach((card) => {
    const createNewsDiv = document.createElement("div");
    createNewsDiv.classList.add("card mb-3 newsCard");
    createNewsDiv.innerHTML = `
    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="..." class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to
                                    additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
    `;
    newsContainer.appendChild(createNewsDiv);
  });
};
categoryDetails();
