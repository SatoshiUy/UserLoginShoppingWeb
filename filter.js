// const macBox = document.querySelector(".mac-box");
// const iphoneBox = document.querySelector(".iphone-box");
// const ipadBox = document.querySelector(".ipad-box");

//
function moveCheck(filter) {
  // Uncheck everything
  document.querySelectorAll(".box").forEach(function(box) {
    box.style.display = "none";
  })
  document.querySelectorAll(".filter").forEach(function(filter) {
    filter.classList.remove("select");
  })
  // Check the current item
  filter.classList.add("select");
}

// Filter
function filter() {
  document.querySelectorAll(".filter").forEach(function (filter) {
    filter.addEventListener("click", function () {
      if (filter.id == "all") {
        moveCheck(filter);
        macBox.style.display = "initial";
        iphoneBox.style.display = "initial";
        ipadBox.style.display = "initial";
      }
      else {
        var pd = document.querySelector("." + filter.id + "-box");
        moveCheck(filter);
        pd.style.display = "initial";
      }
    })
  });
}