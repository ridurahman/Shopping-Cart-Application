import { addToCart } from "/cart.js";
let productCards = document.querySelector("#product-display");

const displayProduct = (item) => {
  productCards.innerHTML += `
    <div class="col-4">
          <div class="card">
        <img id="img" data-productimg="${item.img_source}"
          src="/images/${item.img_source}" 
          class="card-img-top"
          alt="..."
        />
        <div class="card-body" data-productid=${item.id}>
          <h5 id="name" data-name="${item.product_name}" class="card-title">${item.product_name}</h5>
          <p id="description" class="card-text">
          ${item.product_description}
          </p>
          <p id="price" class="card-text" data-price="${item.prices}">Price : ${item.prices}
          </p>
          <p id="inStock" class="card-text" data-instock="${item.inStock}">In Stock : ${item.inStock}
          </p>
          <button class="btn btn-primary addToCartButton" onclick="addToCart(this, ${item.id})" >Add to Cart</button>
         </div>
        </div>
       </div>`;
/*
  const addToCartButton = document.querySelector(".addToCartButton");
  addToCartButton.addEventListener("click", () => {
    addToCart(
      this,
      item.id,
      item.img_source,
      item.product_name,
      item.prices,
      item.inStock
    );
  }); */
};

const getAllProduct = async () => {
  const res = await fetch("/data/products.json");
  const data = await res.json();

  data.map((i) => {
    displayProduct(i);
  });

  //allProducts.push(...data)
};

export { getAllProduct };
