// categories data
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.news_category);
  displayCategories(data.data.news_category);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");

  categories.forEach((category) => {
    const createList = document.createElement("li");

    createList.innerHTML = `
    <a onclick="categoryDetails('${category.category_id}')" class=' text-decoration-none fw-bold' href='#'>${category.category_name}
    `;
    categoryContainer.appendChild(createList);
  });
};
loadCategories();

const categoryDetails = async (category_id) => {
  // spinner start here
  spinnerToggle(true);

  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();

  newsCard(data.data);
};

const newsCard = (cards) => {
  // number of news found
  const newsNumber = document.getElementById("newsNumber");
  newsNumber.textContent = "";
  const createNumField = document.createElement("div");

  createNumField.innerHTML = `
   <h4> ${cards.length > 0 ? cards.length : "No"} News Items found</h4>
   `;
  newsNumber.appendChild(createNumField);

  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";

  const notFoundMsg = document.getElementById("none-msg");
  if (cards.length === 0) {
    notFoundMsg.classList.remove("d-none");
  } else {
    notFoundMsg.classList.add("d-none");
  }

  cards.forEach((card) => {
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

                           <div class="d-flex gap-3">  
                           <img src="${
                             card.author.img
                           }" class="img-container rounded " alt="..." style="width:35px; heigth:35px">
                         <div> <h6 > ${
                           card.author.name === null ||
                           card.author.name.length === 0
                             ? "Not found"
                             : card.author.name
                         } </h6>
                         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p></div>
                         </div>


                            <div>
                            <p>Total View:${card.total_view}</p>
                            
                            </div>
                          <button onclick="loadDetails('${
                            card._id
                          }')" type="button" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                            
                            </div>
                           
                    
                             
                            </div>
                        </div>
                    </div>
    `;
    newsContainer.appendChild(createNewsDiv);
  });
  // spinner start here
  spinnerToggle(false);
};
categoryDetails();

// news details
const loadDetails = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  showDetail(data.data[0]);
};

const showDetail = (details) => {
  console.log(details);
  const modaTitle = document.getElementById("exampleModalLabel");
  modaTitle.innerText = details.title;
  const modaDes = document.getElementById("modalDescription");
  modaDes.innerHTML = `
  <img src='${details.thumbnail_url}'/> 
  <p>${details.details}</p>
 
  <div class="d-flex gap-3">  
  <img src="${
    details.author.img
  }" class="img-container rounded " alt="..." style="width:35px; heigth:35px">
<div> <h6 > ${
    details.author.name === null || details.author.name.length === 0
      ? "No name found for author"
      : details.author.name
  } </h6>

</div>
<div>
<p>Total View:${
    details.total_view === null ? "No views" : details.total_view
  }</p>

</div>
  
  `;
};

// spinner function to show it or not
const spinnerToggle = (ifLoading) => {
  const spinnerField = document.getElementById("spinner-loader");
  if (ifLoading == true) {
    spinnerField.classList.remove("d-none");
  } else {
    spinnerField.classList.add("d-none");
  }
};
categoryDetails("08");
