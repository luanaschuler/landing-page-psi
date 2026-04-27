/*=============== SHOW MENU ===============*/

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*=============== MENU SHOW ===============*/
/* VALIDATE IF CONSTANT EXISTS */
if (navToggle) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!navMenu) return;
    navMenu.classList.toggle("show-menu");
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

const navLinks = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) navMenu.classList.remove("show-menu");
}
navLinks.forEach((link) => link.addEventListener("click", linkAction));

document.addEventListener("click", (e) => {
  if (
    navMenu &&
    navToggle &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
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
  distance: "28px",
  duration: 900,
  delay: 90,
  // reset: true
});

sr.reveal(`.home__header`, { delay: 80, origin: "top" });
sr.reveal(`.home__footer`, { delay: 120, origin: "bottom" });
sr.reveal(`.home__img-container`, { delay: 120, origin: "top" });

sr.reveal(`.about__image`, { delay: 120, origin: "top" });
sr.reveal(`.about__text--main, .about__text--secondary, .about__text--thirth`, {
  delay: 120,
  origin: "bottom",
  interval: 70,
});

sr.reveal(`.help__explain`, { delay: 120, origin: "top" });
sr.reveal(`.help__data .card`, { delay: 90, origin: "bottom", interval: 60 });

sr.reveal(`.curriculum__content`, { delay: 120, origin: "left", interval: 70 });

sr.reveal(`.approach__header`, { delay: 80, origin: "top" });
sr.reveal(`.approach__main, .approach__secondary`, {
  delay: 110,
  origin: "bottom",
});

sr.reveal(`.testimonials-section`, { delay: 120, origin: "bottom" });
sr.reveal(`.faq__container`, { delay: 90, origin: "bottom" });
sr.reveal(`.footer-section`, { delay: 120, origin: "bottom" });

/*================= CAROUSEL ======================*/

// Swiper removed (not used on this page). Guard remains to avoid runtime errors.
if (typeof Swiper !== "undefined") {
  const trandingEl = document.querySelector(".tranding-slider");
  if (trandingEl) {
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
  }
}

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
  if (!timeline || !progress) return;
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

/* Mobile hint: briefly half-flip cards when entering viewport */
if (window.matchMedia("(max-width: 1023px)").matches) {
  const hintObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        if (card.classList.contains("card--hint")) return;
        card.classList.add("card--hint");
        setTimeout(() => {
          card.classList.remove("card--hint");
        }, 1100);
      });
    },
    { threshold: 0.4 },
  );

  cards.forEach((card) => hintObserver.observe(card));
}

/* Auto-open FAQ first item when the section enters view */
const firstFaqItem = document.querySelector(".accordion-item:first-child");
if (firstFaqItem) {
  const faqObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        firstFaqItem.classList.add("active");
        faqObserver.disconnect();
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
  );
  faqObserver.observe(firstFaqItem);
}
/*=============== carosel ===============*/

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  let reviewItems = document.querySelectorAll(".review-item");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (!track || reviewItems.length === 0) return;

  let itemsPerView = getItemsPerView();
  let index = itemsPerView;
  let autoplayInterval;

  function getItemsPerView() {
    if (window.innerWidth < 1024) return 1;
    return 3;
  }

  /* ===== CLONAR PARA LOOP INFINITO ===== */
  function setupInfiniteLoop() {
    itemsPerView = getItemsPerView();

    const items = Array.from(document.querySelectorAll(".review-item"));

    const firstClones = items
      .slice(0, itemsPerView)
      .map((item) => item.cloneNode(true));
    const lastClones = items
      .slice(-itemsPerView)
      .map((item) => item.cloneNode(true));

    firstClones.forEach((clone) => track.appendChild(clone));
    lastClones
      .reverse()
      .forEach((clone) => track.insertBefore(clone, track.firstChild));

    reviewItems = document.querySelectorAll(".review-item");

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
  track.addEventListener("transitionend", () => {
    if (index >= reviewItems.length - itemsPerView) {
      index = itemsPerView;
      moveCarousel(false);
    }

    if (index < itemsPerView) {
      index = reviewItems.length - itemsPerView * 2;
      moveCarousel(false);
    }
  });

  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlide);

  /* AUTOPLAY */
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 3000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  track.addEventListener("mouseenter", stopAutoplay);
  track.addEventListener("mouseleave", startAutoplay);

  /* SWIPE */
  let startX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) prevSlide();
  });

  setupInfiniteLoop();
  startAutoplay();
});

/*=============== BOOK CAROUSEL ===============*/

const bookCarousel = document.querySelector(".book__carousel");

if (bookCarousel) {
  const slides = document.querySelectorAll(".book__carousel-slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  function nextBookSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Initialize with first slide
  showSlide(0);

  // Auto-cycle every 2 seconds
  setInterval(nextBookSlide, 2000);
}
