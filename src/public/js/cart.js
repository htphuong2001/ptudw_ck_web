function renderCart(products) {
  let total = 0;
  let html = `<div class="product title">
                <div class="name">Name</div>
                <div class="price">Price</div>
                <div class="discount">Discount</div>
                <div class="sum">Sum</div>
              </div>`;
  products.forEach((product) => {
    let sum = product.price * (1 - product.discount);
    total += sum;
    html += `<div class="product">
              <button id="${product._id}"><i class='bx bx-minus'></i></button>
              <a href="/store/${product._id}" class="img">
                <img src="${product.img}" alt="" />
              </a>
              <div class="name">${product.name}</div>
              <div class="price">${product.price}</div>
              <div class="discount">-${product.discount * 100}%</div>
              <div class="sum">${sum}</div>
            </div>`;
  });

  html += `<div class="total-cart">
              <span>Total:</span><span>${total}</span>
          </div>
          <div class="check-out">
            <button>CHECKOUT</button>
          </div>`;

  return html;
}

function loadCart() {
  const listProduct = JSON.parse(localStorage.getItem("epic-cart"));
  if (listProduct) {
    $.ajax({
      type: "POST",
      url: "/cart/ajax",
      data: { listProduct },
    }).done(function (products) {
      const htmlCart = renderCart(products);
      $(".cart-page .content").html(htmlCart);
    });
  } else {
    $(".cart-page .content").html("Cart empty");
  }
}

$(document).ready(function () {
  loadCart();
});

$(document).ready(function () {
  $(document).on("click", ".cart-page .content .product button", function () {
    const listProduct = JSON.parse(localStorage.getItem("epic-cart"));
    const idRemove = $(this).attr("id");
    const products = listProduct.filter((id) => id != idRemove);
    localStorage.setItem("epic-cart", JSON.stringify(products));
    loadCart();
  });
});
