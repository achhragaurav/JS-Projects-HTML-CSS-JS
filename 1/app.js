const content = document.querySelectorAll(".contentMain");
const images = document.querySelectorAll(".itemMain img");
const imagesThumb = document.querySelectorAll(".thumbnail .item img");
const imagesThumbitem = document.querySelectorAll(".thumbnail .item");
const nextArrow = document.querySelector(".arrows #next");
const prevArrow = document.querySelector(".arrows #prev");
let counter = 0;

content[0].style.opacity = 1;
images[0].style.opacity = 1;
imagesThumb[0].style.opacity = 1;

const animations = (counter) => {
  content.forEach((item) => {
    gsap.to(item, { opacity: 0 });
  });
  images.forEach((item) => {
    gsap.to(item, { opacity: 0 });
  });
  imagesThumb.forEach((item) => {
    gsap.to(item, { opacity: 0.5 });
  });
  console.log(counter);
  gsap.to(images[counter], { opacity: 1 });
  gsap.to(content[counter], { opacity: 1 });
  gsap.to(imagesThumb[counter], { opacity: 1 });
};

nextArrow.addEventListener("click", () => {
  counter++;
  if (counter > content.length - 1) counter = 0;
  animations(counter);
});

prevArrow.addEventListener("click", () => {
  counter--;
  if (counter < 0) counter = content.length - 1;
  animations(counter);
});

console.log(imagesThumbitem);

imagesThumbitem.forEach((thumb) => {
  thumb.addEventListener("click", (event) => {
    console.log(
      "Item clicked:",
      Number(event.target.parentElement.classList[1].split("_")[1])
    );
    counter = Number(event.target.parentElement.classList[1].split("_")[1]);
    animations(counter);
  });
});
