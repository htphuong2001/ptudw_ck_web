function renderProducts(products) {
  let html = "";
  products.forEach((product) => {
    html += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 product-card-container">
              <a href="/store/${product._id}" class="product-card">
                <div class="img">
                  <img src="${product.img}" alt="" />
                </div>
                <div class="info">
                  <p class="name">${product.name}</p>
                  <p class="price">${product.price}</p>
                </div>
              </a>
              <button id="${product._id}"><i class="bx bxs-cart-add"></i> Add to cart</button>
            </div>`;
  });
  return html;
}

function renderPagination(page, totalPage) {
  let html = "";
  for (let i = 1; i <= totalPage; i++) {
    if (page == i) {
      html += `<button class="active">${i}</button>`;
    } else {
      html += `<button>${i}</button>`;
    }
  }
  return html;
}

function pageProduct() {
  var arrayTag = [];
  $('input[name="tag"]:checked').each(function () {
    arrayTag.push($(this).val());
  });
  const data = {
    _page: $(".page button.active").text(),
    _tag: arrayTag,
    _sort: $("#selectSort").children(":selected").attr("value"),
  };

  $.ajax({
    type: "POST",
    url: "/store/ajax",
    data: data,
  }).done(function (data) {
    const { products, opt } = data;
    const htmlProduct = renderProducts(products);
    const htmlPagination = renderPagination(opt.page, opt.totalPage);
    $("#product-list").html(htmlProduct);
    $("#page-store").html(htmlPagination);
  });
}

$(document).ready(function () {
  $(document).on("click", ".page button", function () {
    $(".page button.active").removeClass("active");
    $(this).addClass("active");
    pageProduct();
  });
});

$(document).ready(function () {
  $(document).on("change", "#selectSort", function () {
    pageProduct();
  });
});

$(document).ready(function () {
  $(document).on("click", "#filter-btn", function () {
    pageProduct();
  });
});
