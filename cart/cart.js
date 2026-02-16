const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");
const totalElement = document.getElementById("cart-total");

const displayCart = () => {

    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Cart is empty</p>";
        totalElement.innerText = 0;
        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.innerHTML = `
      <div class="flex justify-between bg-white p-4 rounded shadow">
        <div class="flex gap-4">
          <img src="${item.image}" class="h-16 w-16 object-contain">
          <div class="text-black">
            <h4 >${item.title}</h4>
            <p>$${item.price} X ${item.quantity}</p>
          </div>
        </div>
        <div class="">
        <p class="text-black">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>

      </div>
    `;

        cartContainer.appendChild(div);
    });

    totalElement.innerText = total.toFixed(2);
};
const clearCart = () => {
    localStorage.removeItem("cart");
    location.reload();
};

displayCart();
