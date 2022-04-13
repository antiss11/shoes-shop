const tabButtonSelector = "product-main-overview__tab-button";
const tabSelector = "product-main-overview__tab";

const productMainOverviewElement = document.querySelector(".product-main-overview");

productMainOverviewElement.addEventListener("click", (e) => {
  let target = e.target.closest(".product-main-overview__tab-button");
  if (!target) return;
  document
    .querySelector(`.${tabButtonSelector}--active`)
    .classList.toggle(`${tabButtonSelector}--active`);
  target.classList.toggle(`${tabButtonSelector}--active`);
  let numberOfTab = Array.from(
    document.querySelectorAll(`.${tabButtonSelector}`)
  ).indexOf(target);
  document
    .querySelector(`.${tabSelector}--active`)
    .classList.toggle(`${tabSelector}--active`);
  document
    .querySelectorAll(".product-main-overview__tab")
    [numberOfTab].classList.toggle("product-main-overview__tab--active");
});
