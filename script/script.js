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

            removeActive();
            setActive(button);

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
     manageSpinner(true)
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
         <button onclick="loadDetails(${product.id})"
        class="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition">
  <i class="fa-regular fa-eye mr-1"></i> Details
</button>


          <button onclick= "addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <i class="fa-solid fa-cart-shopping mr-1"></i> Add
          </button>
        </div>

      </div>
    `;
        productContainer.appendChild(card);

    });
     manageSpinner(false)
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

loadCategory();
// ================= DETAILS =================

const loadDetails = (id) => {
    manageSpinner(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => showDetailsModal(data));
};

//================DETAILS MODAL CARD ADD======================
const showDetailsModal = (product) => {

    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">

      <!-- Image -->
      <div class="bg-gray-100 p-6 rounded-xl">
        <img src="${product.image}"
             class="h-64 mx-auto object-contain">
      </div>

      <!-- Details -->
      <div class="space-y-4">

        <span class="badge badge-primary capitalize">
          ${product.category}
        </span>

        <h2 class="text-xl font-bold">
          ${product.title}
        </h2>

        <div class="flex items-center text-sm text-gray-600">
          <i class="fa-solid fa-star text-yellow-400 mr-1"></i>
          ${product.rating.rate} (${product.rating.count} reviews)
        </div>

        <p class="text-gray-600 text-sm">
          ${product.description}
        </p>

        <p class="text-2xl font-bold text-blue-600">
          $${product.price}
        </p>

       <button onclick= "addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <i class="fa-solid fa-cart-shopping mr-1"></i> Add
          </button>

      </div>

    </div>
  `;

    document.getElementById("product_details_modal").showModal();
    manageSpinner(false)
};
//=============Trending Products===========================
const trendingContainer = document.getElementById("trending-container");

const loadTrendingProducts = async () => {

    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    const sortedProducts = products.sort(
        (a, b) => b.rating.rate - a.rating.rate
    );

    const topThree = sortedProducts.slice(0, 3);

    displayTrending(topThree);
};
const displayTrending = (products) => {

    trendingContainer.innerHTML = "";

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
         <button onclick="loadDetails(${product.id})"
        class="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition">
  <i class="fa-regular fa-eye mr-1"></i> Details
</button>
         <button onclick= "addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <i class="fa-solid fa-cart-shopping mr-1"></i> Add
          </button>
        </div>

      </div>
    `;

        trendingContainer.append(card);
    });
     
};
loadTrendingProducts();

//========================== Cart============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const updateCartCount = () => {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;
    cartData.forEach(item => total += item.quantity);

    cartCount.innerText = total;
};

updateCartCount();

const addToCart = (id, title, price, image) => {

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id,
            title,
            price,
            image,
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: cart.title,
        timer: 1500,
        showConfirmButton: false
    });

    console.log(cart);
    updateCartCount();

};
//===================Spinner===========================
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("product-container").classList.add("hidden")
    }
    else {
        document.getElementById("product-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}



