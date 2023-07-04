let cartCards = document.querySelector("#product-cart");
console.log("🚀 ~ file: app.js:2 ~ cartCards:", cartCards);
let productImage = document.querySelector("#image");
let productName = document.querySelector("#product-name");
let productDescription = document.querySelector("#product-display");
let cartPrice = document.querySelector("#price");
//let cartinStock = document.querySelector("#inStock");
let totalPriceCalc = document.querySelector(".total-price");
let totalItemCalc = document.querySelector(".total-item");

let cartProductTable = document.querySelector("#cart-items");

let btnClearCart = document.querySelector("#btnClearCart");

let allProduct = "";

let totalPrice = 0;
let totalItem = 0;
let subTotal = 0;

const displayTotalPriceAndItem = () => {
  totalPriceCalc.innerText = "Total Price: " + totalPrice;
  totalItemCalc.innerText = "Total Item: " + totalItem;
};
const cartProductRemove = (e) => {
  let upperNode = e.parentNode;
  console.log(upperNode.parentNode.querySelector(".cart-p-price").textContent);
  let removedPrice = Number(
    upperNode.parentNode.querySelector(".cart-p-price").textContent
  );

  totalPrice -= removedPrice;
  totalItem--;
  displayTotalPriceAndItem();
  upperNode.parentNode.remove();
};

const clearCart = () => {
  cartProductTable.innerHTML = "";
  totalPrice = 0;
  totalItem = 0;

  displayTotalPriceAndItem();
};

let addToCart = (event, ...values) => {
  // event.preventDefault()

  //let pId = event.closest(".card-body").dataset.productid;
  let pImage = event.closest(".card").querySelector("#img").dataset.productimg;

  let pTitle = event
    .closest(".card-body")
    .querySelector(".card-title").textContent;

  let pPrice = Number(
    event.closest(".card-body").querySelector("#price").dataset.price
  );
  let pInStock = Number(
    event.closest(".card-body").querySelector("#inStock").dataset.instock
  );
  console.log("🚀 ~ file: cart.js:62 ~ addToCart ~ pInStock:", pInStock)
  let quantity = Number(document.querySelector("#iquantity"));
  console.log("🚀 ~ file: cart.js:61 ~ addToCart ~ quantity:", quantity);

  //let Q = quantity.value;
  //console.log("🚀 ~ file: cart.js:64 ~ addToCart ~ Q:", Q)
  subTotal = pPrice * quantity;
  let pId = values[0];
  //let pImage = "/images/" + values[1];
  //let pTitle = values[2];
  //let pPrice = values[3];
  //let pInStock = values[4];

  totalPrice += pPrice;
  totalItem++;
  displayProductCart(pImage, pTitle, pPrice, pInStock, subTotal);
  console.log("🚀 ~ file: cart.js:77 ~ addToCart ~ pInStock:", pInStock)
  displayTotalPriceAndItem();
};

const displayProductCart = (pImage, pTitle, pPrice, pInStock, subTotal) => {
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
      <td id="price" data-th="Price"><span class="cart-p-price">${pPrice}</span></td>
      <td id="quantity" data-th="quantity">
        <input
          type="number"
          id="iquantity" 
          class="form-control form-control-lg text-center quantity"
          value="1"
        />
      </td>
      <td id="inStock" data-th="inStock">${pInStock}</td>
      <td id="subTotal" data-th="subTotal">${subTotal}</td>
      <td class="actions" data-th="">       
          <button onclick="cartProductRemove(this)" class="btn btn-danger border-secondary btn-md mb-2">
            Remove
          </button>    
      </td>
    </tr>`;

  cartProductTable.innerHTML += productCart;
};

window.addToCart = addToCart;
window.cartProductRemove = cartProductRemove;
window.clearCart = clearCart;

export { addToCart, clearCart };
