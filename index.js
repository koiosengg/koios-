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
