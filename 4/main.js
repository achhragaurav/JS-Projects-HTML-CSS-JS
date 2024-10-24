const backword = document.querySelector(".buttons button:first-of-type");
const forward = document.querySelector(".buttons button:last-of-type");
let counter = 0;
const content = [
  {
    imageURL:
      "https://images.pexels.com/photos/5418830/pexels-photo-5418830.jpeg?auto=compress&cs=tinysrgb&w=5851&h=3901&dpr=1",
    text: "Leafy",
  },
  {
    imageURL:
      "https://images.pexels.com/photos/19283806/pexels-photo-19283806/free-photo-of-dark-green-juniper-bush-branches-pattern-texture.jpeg?auto=compress&cs=tinysrgb&w=5851&h=3901&dpr=1",
    text: "Green",
  },
  {
    imageURL:
      "https://images.pexels.com/photos/16377612/pexels-photo-16377612/free-photo-of-a-leaf-on-a-tiled-floor-with-a-shadow.jpeg?auto=compress&cs=tinysrgb&w=5851&h=3901&dpr=1",
    text: "Grow",
  },
];
const appear = () => {
  gsap.to(".logo", {
    opacity: 1,
    duration: 1,
    ease: "power2.inOut",
    delay: 0,
  });
  gsap.to("nav ul li", {
    opacity: 1,
    duration: 1,
    ease: "power2.inOut",
    delay: 0.2,
    stagger: 0.2,
  });

  gsap.to(".text", {
    opacity: 1,
    duration: 3,
    delay: 0.4,
    ease: "power2.inOut",
  });
  gsap.to(".blr", {
    "backdrop-filter": "blur(15px)",
    background: "#ffffff15",
    duration: 3,
    delay: 1,
    ease: "power2.inOut",
  });

  gsap.to(".buttons button", {
    duration: 1,
    opacity: 1,
    delay: 1.2,
    ease: "power2.inOut",
  });
  gsap.to(".tags i", {
    duration: 1,
    opacity: 1,
    delay: 1.2,
    ease: "power2.inOut",
    stagger: 0.2,
  });
};
const disappear = (imageURL, text) => {
  gsap.to(".text", {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power2.inOut",
  });
  gsap.to(".blr", {
    "backdrop-filter": "blur(0px)",
    background: "#ffffff00",
    duration: 1,
    ease: "power2.inOut",
  });

  gsap.to(".buttons button", {
    duration: 1,
    opacity: 0,
    delay: 0.5,
    ease: "power2.inOut",
  });
  gsap.to(".tags i", {
    duration: 1,
    opacity: 0,
    delay: 0.5,
    ease: "power2.inOut",
    stagger: 0.2,
  });

  gsap.to(".logo", {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
  });
  gsap.to("nav ul li", {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.to(".backdrop", {
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power2.inOut",
    onComplete: () => {
      console.log(imageURL);

      document.querySelector(
        ".backdrop"
      ).style.backgroundImage = `url(${imageURL})`;
      document.querySelector(
        ".text"
      ).style.backgroundImage = `url(${imageURL})`;
      document.querySelector(".text").innerHTML = `${text} <span>life</span>`;
    },
  });

  gsap.to(".backdrop", {
    opacity: 1,
    duration: 1,
    delay: 3,
    ease: "power2.inOut",
    onComplete: () => {
      appear();
    },
  });
};
appear();
// Animation change

const animations = (counter) => {
  const imageURL = content[counter].imageURL;
  const text = content[counter].text;
  console.log(content[counter].text);
  disappear(imageURL, text);
};

forward.addEventListener("click", () => {
  counter++;
  if (counter > content.length - 1) counter = 0;
  animations(counter);
});

backword.addEventListener("click", () => {
  counter--;
  if (counter < 0) counter = content.length - 1;
  animations(counter);
});
