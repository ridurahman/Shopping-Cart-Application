let cartCards = document.querySelector("#product-cart");
console.log("🚀 ~ file: app.js:2 ~ cartCards:", cartCards);
let productImage = document.querySelector("#image");
let productName = document.querySelector("#product-name");
let productDescription = document.querySelector("#product-display");
let cartPrice = document.querySelector("#price");

let totalPriceCalc = document.querySelector(".total-price");
let totalItemCalc = document.querySelector(".total-item");

let cartProductTable = document.querySelector("#cart-items");

let btnClearCart = document.querySelector("#btnClearCart");

let totalItem = 0;
let subTotal = 0;
var totalPrice = 0;
let ids = [];

const displayTotalPriceAndItem = () => {
  totalPriceCalc.innerText = "Total Price: " + totalPrice;
  totalItemCalc.innerText = "Total Item: " + totalItem;
};

const cartProductRemove = (e, pId) => {
  let upperNode = e.parentNode;
  let removedPrice = Number(
    upperNode.parentNode.querySelector(".cart-sub-price").textContent
  );
  totalPrice -= removedPrice;
  totalItem--;
  upperNode.parentNode.remove();
  let neArray = ids.filter((item) => item !== Number(pId));
  ids = neArray;
  displayTotalPriceAndItem();
};

const clearCart = () => {
  cartProductTable.innerHTML = "";
  totalPrice = 0;
  totalItem = 0;
  displayTotalPriceAndItem();
  ids = [];
};

let addToCart = (event, ...values) => {
  // event.preventDefault()
  let pId = Number(values[0]);
  if (ids.includes(pId)) {
    alert("item is already in cart");
  } else {
    //let pId = event.closest(".card-body").dataset.productid;
    let pImage = event.closest(".card").querySelector("#img")
      .dataset.productimg;

    let pTitle = event
      .closest(".card-body")
      .querySelector(".card-title").textContent;

    let pPrice = Number(
      event.closest(".card-body").querySelector("#price").dataset.price
    );
    let pInStock = Number(
      event.closest(".card-body").querySelector("#inStock").dataset.instock
    );

    //let pImage = "/images/" + values[1];
    //let pTitle = values[2];
    //let pPrice = values[3];
    //let pInStock = values[4];
    //subTotal = pPrice * quantity;
    //totalPrice += pPrice;
    totalItem++;
    displayProductCart(pId, pImage, pTitle, pPrice.toFixed(2), pInStock);
    calculateSubTotal();
    calculateTotal();
    //displayTotalPriceAndItem();
    totalItemCalc.innerText = "Total Item: " + totalItem;
    //totalPriceCalc.innerText = "Total Price: " + (totalPrice += pPrice);
    ids.push(pId);
  }
};

const calculateTotal = () => {
  
  const subtotalElements = document.getElementsByClassName("cart-sub-price");
  totalPrice = 0;

  Array.from(subtotalElements).forEach(function (subtotalElement) {
    const subtotalValue = parseFloat(subtotalElement.textContent);
    totalPrice += subtotalValue;
  });
  totalPriceCalc.innerText = "Total Price: $" + totalPrice.toFixed(2);
  console.log(totalPrice.toFixed(2));
}; 

const calculateSubTotal = () => {
  const quantityInputs = document.querySelectorAll(".quan-input");
  Array.from(quantityInputs).forEach(function (quantityInput) {
    quantityInput.addEventListener("input", function () {
      const row = quantityInput.closest("tr");

      const quantityValue = parseInt(quantityInput.value);

      const priceElement = row.querySelector(".cart-p-price");

      const priceValue = parseFloat(priceElement.textContent);

      const subtotal = quantityValue * priceValue;
      const subtotalElement = row.querySelector(".cart-sub-price");
      subtotalElement.textContent = subtotal.toFixed(2);
      calculateTotal();
    });
  });
};

const displayProductCart = (pId, pImage, pTitle, pPrice, pInStock) => {
  let productCart = `
    <tr>
      <td data-th="Product">
        <div class="row">
          <div class="col-md-3 text-left">
            <img
              src="/images/${pImage}"
              alt=""
              class="img-fluid d-none d-md-block rounded mb-2 shadow"
            />
          </div>
          <div class="col-md-9 text-left mt-sm-2">
            <h4 id="product-name">${pTitle}</h4>
            <p id="product-description" class="font-weight-light">
              Description
            </p>
          </div>
        </div>
      </td>
      <td id="price" >$<span class="cart-p-price">${pPrice}</span></td>
      <td id="quantity" >
        <input
          type="number" name="iquantity"
          id="quan" value="1" class="quan-input"
          min="1" max="${pInStock}"
        />
        
      </td>
      <td id="inStock" >${pInStock}</td>
      <td id="subTotal" >$<span class="cart-sub-price">${pPrice}</span></td>
      <td class="actions" >       
          <button onclick="cartProductRemove(this, ${pId})" class="btn btn-danger border-secondary btn-md mb-2">
            Remove
          </button>    
      </td>
    </tr>`;

  cartProductTable.innerHTML += productCart;
  //totalPriceCalc.innerText = "Total Price: " + (totalPrice += pPrice);
};

const getQuantity = (value, price) => {
  return value, getSubTotal;
};
const getSubTotal = () => {
  subTotal = value * price;
  return subTotal;
};
window.addToCart = addToCart;
window.cartProductRemove = cartProductRemove;
window.clearCart = clearCart;

export { addToCart, clearCart };
