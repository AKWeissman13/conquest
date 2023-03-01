const buttons = document.querySelectorAll("[data-carousel-button]");
const menu = document.querySelector("[data-menu]");
menu.addEventListener("click", () => {
  const togle = menu.closest("header").querySelector(".header__menu-container");

  if (togle.style.display === "block") {
    togle.style.display = "none";
    menu.setAttribute("src","img/menu.png")
    menu.closest("html").querySelector("body").style.overflow = "visible";
  }
  else{
    console.log(togle);
    togle.style.display = "block";
    togle.querySelector(".menu").style.height = "100vh";
    menu.setAttribute("src","img/menu-close.png")
    console.log(menu.closest("html").querySelector("body"));
    menu.closest("html").querySelector("body").style.overflow = "hidden";
    kids = togle.querySelectorAll(".menu__link"); 
    kids.forEach((kid)=>{
      kid.style.opacity ="1";
    })
  }
});
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const counter = button
      .closest("[data-carousel]")
      .querySelector("[data-counter]");
    const activeSlide = slides.querySelector("[data-active]");
    if ([...slides.children].indexOf(activeSlide) === 0) {
      for (let i = 2; i < slides.children.length; i++) {
        slides.children[i].style.transform =
          "translateX(-" + (100 * i - 100) + "%)";
      }
    }
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    if (activeSlide.hasAttribute("data-active")) {
      delete activeSlide.dataset.return;
    }
    if (slides.children[newIndex].hasAttribute("data-active")) {
      delete activeSlide.dataset.return;
    }

    let translateFactor = newIndex * 100;
    let reverseTransFactor = 100 - newIndex * 100;
    activeSlide.style.opacity = "1";
    slides.children[newIndex].style.transition = "1s";
    slides.children[newIndex].style.opacity = "1";
    activeSlide.style.transition = "1s";

    if (offset === -1) {
      activeSlide.style.transform = "translateX(-" + translateFactor + "%)";
      //"translateX(-" + reverseTransFactor + "%)";
      slides.children[newIndex].style.transform =
        "translateX(-" + translateFactor + "%)";
      //"translateX(-" + reverseTransFactor + "%)";
    } else {
      activeSlide.style.transform = "translateX(-" + translateFactor + "%)";
      slides.children[newIndex].style.transform =
        "translateX(-" + translateFactor + "%)";
    }
    var x = newIndex + 1;
    counter.innerHTML = "0" + x;

    if (
      newIndex === slides.children.length - 1 &&
      [...slides.children].indexOf(activeSlide) === 0
    ) {
      for (let i = 0; i < slides.children.length - 1; i++) {
        console.log("here");
        slides.children[i].style.transform =
          "translateX(-" + (100 * i + 100) + "%)";
      }
    }

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
    if (newIndex === 0) {
      console.log("here1");
      retunObjects = slides.querySelectorAll("li:not(li[data-active])");
      retunObjects.forEach((slide) => {
        //slide.dataset.return = true;
        //slide.style.transition = null;
        slide.style.transform = null;
        //slide.style.opacity = null;
      });
    }
  });
});
