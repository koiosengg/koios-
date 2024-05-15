//Mobile Navbar
document.addEventListener("DOMContentLoaded", function () {
  const mobileNavButton = document.querySelector(".s-mobile-nav-button");
  const mobileNavbar = document.querySelector(".s-mobile-navbar");
  const mobileNavbarCancelButton = document.querySelector(
    ".s-mobile-navbar-cancel-button"
  );

  mobileNavButton.addEventListener("click", function () {
    mobileNavbar.style.display =
      mobileNavbar.style.display === "flex" ? "none" : "flex";
  });
  mobileNavbarCancelButton.addEventListener("click", function () {
    mobileNavbar.style.display = "none";
  });

  var headings = document.querySelectorAll(".s-mobile-navlink-heading");
  headings.forEach(function (heading) {
    heading.addEventListener("click", function () {
      var clickedNavList = this.nextElementSibling;
      var isAlreadyVisible = clickedNavList.classList.contains("s-visible");
      var allNavLists = document.querySelectorAll(
        ".s-mobile-nav-list.s-visible"
      );
      allNavLists.forEach(function (navList) {
        if (navList !== clickedNavList) {
          navList.classList.remove("s-visible");
          var previousHeading = navList.previousElementSibling;
          var headingText = previousHeading.querySelector(".heading");
          var iconContainer = previousHeading.querySelector(
            ".s-mobile-navlink-heading-icon"
          );
          headingText.style.color = "";
          iconContainer.classList.remove("s-rotate");
          var svgIcon = iconContainer.querySelector("svg path");
          svgIcon.style.fill = "";
        }
      });
      clickedNavList.classList.toggle("s-visible");
      var headingText = this.querySelector(".heading");
      var iconContainer = this.querySelector(".s-mobile-navlink-heading-icon");
      var svgIcon = iconContainer.querySelector("svg path");
      if (clickedNavList.classList.contains("s-visible")) {
        headingText.style.color = "#FFBF00";
        iconContainer.classList.add("s-rotate");
        svgIcon.style.fill = "#FFBF00";
      } else {
        headingText.style.color = "";
        iconContainer.classList.remove("s-rotate");
        svgIcon.style.fill = "";
      }
      if (isAlreadyVisible) {
        headingText.style.color = "";
        iconContainer.classList.remove("s-rotate");
        svgIcon.style.fill = "";
      }
    });
  });
});

//Svg in viewport animation
// Get the target div
var circleDiv = document.querySelector(".p-circle-svg");

// Get the SVG elements
var svg1 = document.querySelector(".svg1");
var svg2 = document.querySelector(".svg2");

// Options for the Intersection Observer
var options = {
  root: null, // Use the viewport as the root
  rootMargin: "0px", // No margin around the viewport
  threshold: 0, // Trigger when any part of the target is visible
};

// Initially hide svg2
svg2.style.display = "none";

// Callback function for the Intersection Observer
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // If the div is in the viewport, show svg2 after 1 second and hide svg1
      setTimeout(function () {
        svg1.style.display = "none";
        svg2.style.display = "inline";
      }, 1000);
      // Apply box shadow when the target is in the viewport
      circleDiv.style.boxShadow = "0px 6px 50px 15px rgba(255, 191, 0, 0.17)";
    } else {
      // If the div is not in the viewport, show svg1 and hide svg2
      svg1.style.display = "inline";
      svg2.style.display = "none";
      // Remove box shadow when the target is not in the viewport
      circleDiv.style.boxShadow = "none";
    }
  });
}

// Create a new Intersection Observer
var observer = new IntersectionObserver(handleIntersect, options);

// Start observing the target div
observer.observe(circleDiv);

//Image carousel

window.addEventListener("DOMContentLoaded", function () {
  const carouselSets = document.querySelectorAll(".s-carousel-set");
  const carouselText = document.querySelector(".s-carousel-text-container");
  const textElements = carouselText.querySelectorAll("p");
  const positions = [
    "s-position2",
    "s-position1",
    "s-position0",
    "s-position-1",
    "s-position-2",
  ];
  let currentIndex = 0;

  if (carouselSets.length > 5) {
    const diff = carouselSets.length - 5;
    for (let i = 1; i <= diff; i++) {
      positions.push("s-not-active");
    }
  }

  function shiftPositionClasses() {
    const newPositionIndex = currentIndex % positions.length;

    carouselSets.forEach(function (set, index) {
      const newPosition = (newPositionIndex + index) % positions.length;
      set.className = "s-carousel-set " + positions[newPosition];
    });

    // Hide all text elements
    textElements.forEach(function (text) {
      text.style.display = "none";
    });

    // Show the corresponding text element
    textElements[newPositionIndex].style.display = "block";

    currentIndex++;

    setTimeout(shiftPositionClasses, 4000); // 4 seconds delay
  }

  shiftPositionClasses();
});

document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".s-product-img-carousel");

  sliders.forEach(function (slider) {
    const nextBtn = slider.querySelector(".s-next-img");
    const prevBtn = slider.querySelector(".s-previous-img");
    const sliderContent = slider.querySelector(".s-slider");
    const indicator = slider.querySelector(".s-carousel-indicator");
    const slides = slider.querySelectorAll(".s-slider img");
    const totalSlides = slides.length;
    const sliderWidth = sliderContent.getBoundingClientRect().width;
    let counter = 0;

    function updateIndicatorColor() {
      const scrollProgress = ((counter + 1) / totalSlides) * 100;
      indicator.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const indicatorDiv = document.createElement("div");
        indicatorDiv.classList.add("s-carousel-indicator-container");
        indicator.appendChild(indicatorDiv);
      }
      const indicatorDivs = indicator.querySelectorAll(
        ".s-carousel-indicator-container"
      );
      indicatorDivs.forEach((div, index) => {
        if (index === counter) {
          div.style.background = "#01cfdc";
        } else {
          div.style.background = "#c8c8c8";
        }
      });
    }

    function updateSlider() {
      sliderContent.style.transform = `translateX(-${counter * sliderWidth}px)`;

      if (counter === 0) {
        prevBtn.classList.add("disabled");
      } else {
        prevBtn.classList.remove("disabled");
      }

      if (counter === totalSlides - 1) {
        nextBtn.classList.add("disabled");
      } else {
        nextBtn.classList.remove("disabled");
      }

      updateIndicatorColor();
    }

    nextBtn.addEventListener("click", function () {
      if (counter < totalSlides - 1) {
        counter++;
        updateSlider();
      }
    });

    prevBtn.addEventListener("click", function () {
      if (counter > 0) {
        counter--;
        updateSlider();
      }
    });

    updateIndicatorColor();
  });
});










