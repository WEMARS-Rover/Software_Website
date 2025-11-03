import "scripts/menu.js";

function toggleMechCard() {
  var card = document.getElementById("Mechanical");
  var overlay = document.getElementById("overlay");

  if (card.classList.contains("active")) {
    card.classList.remove("active");
    overlay.classList.remove("active");

    setTimeout(function () {
      card.style.visibility = "hidden";
      overlay.style.visibility = "hidden";
    }, 600);
  } else {
    card.style.visibility = "visible";
    overlay.style.visibility = "visible";
    card.classList.add("active");
    overlay.classList.add("active");
  }
}

function toggleElecCard() {
  var x = document.getElementById("Electrical");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function toggleSoftCard() {
  var x = document.getElementById("Software");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function toggleBusCard() {
  var x = document.getElementById("Business");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function toggleSciCard() {
  var x = document.getElementById("Science");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

ScrollReveal({
  reset: false,
  distance: "60px",
  duration: 500,
  delay: 400,
});

ScrollReveal().reveal(".sec-01 .subimages", {
  delay: 500,
  origin: "bottom",
});
ScrollReveal().reveal(".subtext-box", { delay: 700, origin: "right" });
