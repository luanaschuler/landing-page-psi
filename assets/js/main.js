/*=============== SHOW MENU ===============*/

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*=============== MENU SHOW ===============*/
/* VALIDATE IF CONSTANT EXISTS */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
/*=============== MENU HIDDEN ===============*/
/* VALIDATE IF CONSTANT EXISTS */

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
});

document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("show-menu");
  }
});

/*=============== CHANGE BACKGROUND HEADER ===============*/

function scrollHeader() {
  const header = document.getElementById("header");
  //When the scroll is greater than 50viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true
});

sr.reveal(`.home__header, .section__title`, { delay: 400 });
sr.reveal(`.home__footer`, { delay: 700 });
sr.reveal(`.home__img`, { delay: 600, origin: "top" });

sr.reveal(
  `.about__img, .products__card, .footer__logo, .footer__content, .footer__copy`,
  { origin: "top", interval: 100 },
);
sr.reveal(`.specs__data, discount__animate`, {
  origin: "left",
  interval: 100,
});
sr.reveal(`.specs__img, .discount__img`, { origin: "right" });
sr.reveal(`.case__img`, { origin: "top" });
sr.reveal(`.case__data`);

/*================= CAROUSEL ======================*/

var TrandingSlider = new Swiper(".tranding-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  spaceBetween: 10,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// =============== FAQ ACCORDION ===============
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;

    // Fecha os outros se quiser apenas um aberto por vez:
    document.querySelectorAll(".accordion-item").forEach((el) => {
      if (el !== item) el.classList.remove("active");
    });

    // Alterna o estado do item clicado
    item.classList.toggle("active");
  });
});

/*=============== SCROLL REVEAL ANIMATION ===============*/

const timeline = document.querySelector(".approach__timeline");
const progress = document.querySelector(".approach__progress");

window.addEventListener("scroll", () => {
  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const visible = Math.min(
    Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
    1,
  );

  if (window.innerWidth <= 768) {
    progress.style.height = visible * 100 + "%";
  } else {
    progress.style.width = visible * 100 + "%";
  }
});

/*=============== FLIP CARDS ===============*/

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", function (e) {
    e.stopPropagation();

    cards.forEach((c) => {
      if (c !== this) c.classList.remove("flipped");
    });

    this.classList.toggle("flipped");
  });
});

document.addEventListener("click", function () {
  cards.forEach((c) => c.classList.remove("flipped"));
});
/*=============== carosel ===============*/



document.addEventListener("DOMContentLoaded", function () {

  const track = document.querySelector('.carousel-track');
  let reviewItems = document.querySelectorAll('.review-item');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  if (!track || reviewItems.length === 0) return;

  let itemsPerView = getItemsPerView();
  let index = itemsPerView;
  let autoplayInterval;

  function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  /* ===== CLONAR PARA LOOP INFINITO ===== */
  function setupInfiniteLoop() {

    itemsPerView = getItemsPerView();

    const items = Array.from(document.querySelectorAll('.review-item'));

    const firstClones = items.slice(0, itemsPerView).map(item => item.cloneNode(true));
    const lastClones = items.slice(-itemsPerView).map(item => item.cloneNode(true));

    firstClones.forEach(clone => track.appendChild(clone));
    lastClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

    reviewItems = document.querySelectorAll('.review-item');

    index = itemsPerView;
    moveCarousel(false);
  }

  function moveCarousel(animate = true) {
    const itemWidth = reviewItems[0].offsetWidth + 24;

    if (!animate) track.style.transition = "none";
    else track.style.transition = "transform 0.6s ease";

    track.style.transform = `translateX(-${index * itemWidth}px)`;

    highlightCenter();
  }

  function highlightCenter() {
    reviewItems.forEach((item) => item.classList.remove("is-active"));

    const centerIndex = index + Math.floor(itemsPerView / 2);
    if (reviewItems[centerIndex]) {
      reviewItems[centerIndex].classList.add("is-active");
    }
  }

  function nextSlide() {
    index++;
    moveCarousel(true);
  }

  function prevSlide() {
    index--;
    moveCarousel(true);
  }

  /* ===== CORRIGE QUANDO ENTRA NO CLONE ===== */
  track.addEventListener('transitionend', () => {

    if (index >= reviewItems.length - itemsPerView) {
      index = itemsPerView;
      moveCarousel(false);
    }

    if (index < itemsPerView) {
      index = reviewItems.length - (itemsPerView * 2);
      moveCarousel(false);
    }

  });

  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);

  /* AUTOPLAY */
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 3000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  /* SWIPE */
  let startX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) prevSlide();
  });

  // window.addEventListener('resize', () => {
  //   location.reload(); // reinicia corretamente
  // });

  setupInfiniteLoop();
  startAutoplay();

});

