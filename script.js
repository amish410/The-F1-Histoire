function drivers() {
    let year = document.getElementById("drivers").value;
    if (year < 1950 || year > 2020) {
        console.log("Please input a valid number within the range :)")
        document.getElementById("drivererror").style.display = "inline";
    } else {
        document.getElementById("drivererror").style.display = "none";
    }
}

function constructors() {
    let year = document.getElementById("constructors").value;
    if (year < 1958 || year > 2020) {
        console.log("Please input a valid number within the range :)")
        document.getElementById("constructorerror").style.display = "inline";
    } else {
        document.getElementById("constructorerror").style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("drivers").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      drivers();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("constructors").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      constructors();
    }
  });
});