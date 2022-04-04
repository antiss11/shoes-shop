"use strict";

const filledColor = "#e71f25";
const unfilledColor = "#e1e1da";

class Slider {
  constructor() {
    this.currentHandler;
    this.barElement = document.querySelector(".price-slider__bar");
    this.barElementCoords = this.barElement.getBoundingClientRect();
    this.handleMinElement = document.querySelector(".price-slider__handle--min");
    this.handleMaxElement = document.querySelector(".price-slider__handle--max");
    this.handleMinPos = 0;
    this.handleMaxPos = 0;
    this.priceMinElement = document.querySelector(".price-slider__price--min");
    this.priceMaxElement = document.querySelector(".price-slider__price--max");
    this.minPricePos = 0;
    this.maxPricePos = 0;
    this.handleWidth = this.handleMinElement.offsetWidth;
    this.barWidth = this.barElement.offsetWidth;
    this.maxPriceValue = +this.barElement.dataset.max;
    this.minPriceValue = +this.barElement.dataset.max;
    this.shiftX;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleMinElement.addEventListener("mousedown", (e) =>
      this.onMouseDown(this.handleMinElement, e)
    );
    this.handleMaxElement.addEventListener("mousedown", (e) =>
      this.onMouseDown(this.handleMaxElement, e)
    );
    this.pricePerPx = this.maxPriceValue / this.barWidth;
    this.reset();
    this.fillPriceRange();
  }

  onMouseDown(handleElement, e) {
    e.preventDefault();
    this.currentHandler = handleElement;
    if (handleElement === this.handleMinElement) {
      this.shiftX = e.clientX - this.barElementCoords.left - this.handleMinPos;
    } else if (handleElement === this.handleMaxElement) {
      this.shiftX = e.clientX - this.barElementCoords.left - this.handleMaxPos;
    }
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.onMouseMove);
      this.currentHandler = null;
      this.shiftX = null;
    });
  }

  onMouseMove(e) {
    let maxHandlerPos;
    let pricePos;
    let spaceBetweenPrices =
      this.barElement.offsetWidth -
      this.minPricePos +
      this.maxPricePos -
      this.priceMinElement.offsetWidth -
      this.priceMaxElement.offsetWidth;
    let pos = e.clientX - this.barElementCoords.left - this.shiftX;
    if (this.currentHandler === this.handleMinElement) {
      if (pos < 0) pos = 0;
      this.handleMinPos = pos;
      if (pos > maxHandlerPos) pos = maxHandlerPos;
      pricePos = pos - this.priceMinElement.offsetWidth / 2 + this.handleWidth / 2;
      this.priceMinPos = pricePos;
      this.priceMinElement.textContent = `${Math.round(pos * this.pricePerPx)}$`;
      this.moveAt(this.currentHandler, pos);
      this.fillPriceRange();
      if (spaceBetweenPrices < 0) return;
      this.moveAt(this.priceMinElement, pricePos);
    } else if (this.currentHandler === this.handleMaxElement) {
      this.handleMaxPos = pos;
      if (pos > 0) pos = 0;
      maxHandlerPos = -this.barWidth + this.handleWidth * 2 + this.handleMinPos;
      if (pos < maxHandlerPos) pos = maxHandlerPos;
      pricePos = pos + this.priceMaxElement.offsetWidth / 2 - this.handleWidth / 2;
      this.priceMaxPos = pricePos;
      this.priceMaxElement.textContent = `${Math.round(
        this.maxPriceValue + pos * this.pricePerPx
      )}$`;
      this.moveAt(this.currentHandler, pos);
      this.fillPriceRange();
      if (spaceBetweenPrices < 0) return;
      this.moveAt(this.priceMaxElement, pricePos);
    }
  }

  moveAt(el, x) {
    el.style.transform = `translateX(${x}px)`;
  }

  reset() {
    this.priceMinPos = -(
      this.priceMinElement.offsetLeft +
      this.priceMinElement.offsetWidth / 2 -
      this.handleWidth / 2
    );
    this.priceMaxPos =
      this.barWidth -
      this.priceMaxElement.offsetLeft -
      this.priceMaxElement.offsetWidth / 2 -
      this.handleWidth / 2;
    this.moveAt(this.priceMinElement, this.priceMinPos);
    this.moveAt(this.priceMaxElement, this.priceMaxPos);
  }

  fillPriceRange() {
    let left =
      ((this.handleMinPos + this.handleMinElement.offsetWidth / 2) * 100) /
      this.barElement.offsetWidth;
    let right =
      100 +
      ((this.handleMaxPos - this.handleMaxElement.offsetWidth / 2) * 100) /
        this.barElement.offsetWidth;
    this.barElement.style.background = `linear-gradient(to right,
      ${unfilledColor} ${left}%, ${filledColor} ${left}%, ${filledColor} ${right}%, ${unfilledColor} ${right}%)`;
  }
}

let slider = new Slider();
