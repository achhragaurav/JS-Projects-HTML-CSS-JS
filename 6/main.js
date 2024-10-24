gsap.to(".overlay", {
  top: "-100%",
  duration: 1,
  stagger: 0.1,
  ease: "power2.inOut",
});
gsap.to(".content-gallery li img", {
  scale: 1.1, // Reset scale
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out",
});

gsap.to(".content-gallery li .content", {
  translateY: "-15px", // Reset scale
  opacity: 1,
  delay: 0.3,
  duration: 1,
  stagger: 0.1,
  ease: "power2.out",
});
const galleryItems = document.querySelectorAll(".content-gallery li");
// const image = document.getElementById("imageToHover");
// const content = galleryItems.querySelector(".content");
// const overlay = galleryItems.querySelector(".overlay");

galleryItems.forEach((item) =>
  item.addEventListener("mouseenter", () => {
    gsap.to(
      [...galleryItems].map((item) => item.children[2]),
      {
        backgroundColor: "#0000005d",
        duration: 0.5,
        ease: "power2.out",
      }
    );
    gsap.to(item.children[2], {
      backgroundColor: "#00000000",
      duration: 0.5,
      ease: "power2.out",
    });
    console.log(document.querySelectorAll(".number span"));

    // gsap.to(".number", {
    //   opacity: 0.5, // Make the number fully visible
    //   duration: 0.5,
    // });
    // gsap.to(".number span", {
    //   backgroundPosition: "0% 0%", // Move the background from bottom (100%) to top (0%)
    //   duration: 1.5,
    //   ease: "power2.out",
    //   delay: 0.5,
    // });

    // gsap.to(".number", {
    //   opacity: 0.5, // Make the number fully visible
    //   duration: 0.5,
    // });

    // Animate the span from bottom to top
    // gsap.to(".number span", {
    //   top: "100%", // Move the span up to cover the number
    //   duration: 1,
    //   ease: "power2.out",
    // });
  })
);

// galleryItems.forEach((item) => {
//   item.addEventListener("mouseleave", () => {
//     gsap.to(
//       [...galleryItems].map((item) => item.children[2]),
//       {
//         backgroundColor: "#00000034",
//         duration: 0.5,
//         ease: "power2.out",
//       }
//     );
//   });
//   item.addEventListener("click", (e) => {
//     console.log(e.target.closest("li"));

//     gsap.to(
//       [...galleryItems].filter((item) => item.id !== e.target.closest("li").id),
//       {
//         scale: "0.5",
//         duration: 0.5,
//         // opacity: 0,
//         ease: "power2.out",
//       }
//     );
//     gsap.to(item, {
//       scale: "1",
//       duration: 0.5,
//       ease: "power2.out",
//     });
//     gsap.to(item, {
//       translateX: "-60vw",
//       width: "90vw",
//       duration: 1,
//       delay: 2,
//       ease: "power2.out",
//     });
//   });
// });

galleryItems.forEach((item) => {
  // Reset background color on mouse leave
  item.addEventListener("mouseleave", () => {
    gsap.to(
      [...galleryItems].map((item) => item.children[2]), // Targeting the third child
      {
        backgroundColor: "#00000034",
        duration: 0.5,
        ease: "power2.out",
      }
    );
  });

  // Handle item click
  item.addEventListener("click", (e) => {
    // Log closest "li" for debugging
    console.log(e.target.closest("li"));

    // Animate non-clicked items (scale down)
    gsap.to(
      [...galleryItems].filter((el) => el.id !== e.target.closest("li").id),
      {
        scale: 0.5,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    // Animate clicked item (reset scale)
    gsap.to(item, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});
