const categoryContainer = document.getElementById("category-container");
const productContainer = document.getElementById("product-container");


// ================= LOAD CATEGORIES =================
const loadCategory = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(data => displayCategory(["all", ...data]));
};


// ================= DISPLAY CATEGORY BUTTONS =================
const displayCategory = (categories) => {

  categoryContainer.innerHTML = "";

  categories.forEach((category, index) => {

    const button = document.createElement("button");
    button.innerText = category === "all" ? "All" : category;

    button.className =
      "px-5 py-2 rounded-full border border-blue-500 text-blue-500 transition";

    // First button active
    if (index === 0) {
      setActive(button);
      loadProducts("https://fakestoreapi.com/products");
    }

    button.addEventListener("click", () => {

      removeActive(); // remove all active
      setActive(button); // set clicked active

      if (category === "all") {
        loadProducts("https://fakestoreapi.com/products");
      } else {
        loadProducts(`https://fakestoreapi.com/products/category/${category}`);
      }
    });

    categoryContainer.appendChild(button);
  });
};


// ================= LOAD PRODUCTS =================
const loadProducts = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => displayProducts(data));
};


// ================= DISPLAY PRODUCTS =================
const displayProducts = (products) => {

  productContainer.innerHTML = "";

  products.forEach(product => {

    const card = document.createElement("div");

    card.className =
      "bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden";

    card.innerHTML = `
      <div class="bg-gray-100 p-6">
        <img src="${product.image}" class="h-56 mx-auto object-contain">
      </div>

      <div class="p-5 space-y-3">

        <div class="flex justify-between items-center">
          <span class="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full capitalize">
            ${product.category}
          </span>

          <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-star text-yellow-400 mr-1"></i>
            ${product.rating.rate} (${product.rating.count})
          </div>
        </div>

        <h2 class="text-gray-800 font-semibold text-sm line-clamp-2">
          ${product.title}
        </h2>

        <p class="text-xl font-bold text-gray-900">
          $${product.price}
        </p>

        <div class="flex gap-3 pt-2">
          <button class="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition">
            <i class="fa-regular fa-eye mr-1"></i> Details
          </button>

          <button class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <i class="fa-solid fa-cart-shopping mr-1"></i> Add
          </button>
        </div>

      </div>
    `;

    productContainer.appendChild(card);
  });
};


// ================= ACTIVE SYSTEM =================
const setActive = (button) => {
  button.classList.remove("text-blue-500", "border-blue-500");
  button.classList.add("bg-blue-600", "text-white");
};

const removeActive = () => {
  const buttons = categoryContainer.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.classList.remove("bg-blue-600", "text-white");
    btn.classList.add("text-blue-500", "border-blue-500");
  });
};


// ================= INIT =================
loadCategory();
