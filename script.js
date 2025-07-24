let constructors = []
let drivers = []

fetch('constructors.json')
    .then(response => response.json())
    .then(data => {
        constructors = data;
    })

fetch('drivers.json')
    .then(response => response.json())
    .then(data => {
        drivers = data;
    })

function showdrivers() {
    let year = document.getElementById("drivers").value;
    if (year < 1950 || year > 2020) {
        console.log("Please input a valid number within the range :)")
        document.getElementById("drivererror").style.display = "inline";
        return;
    } else {
        document.getElementById("drivererror").style.display = "none";
    }
}

function showconstructors() {
    const year = parseInt(document.getElementById("constructors").value);

    if (isNaN(year) || year < 1958 || year > 2020) {
        console.log("Please input a valid number within the range :)");
        document.getElementById("constructorerror").style.display = "inline";
        return;
    } else {
        document.getElementById("constructorerror").style.display = "none";
    }

    let length = constructors[year].length;
    var table = document.getElementById("constructorstandings");

    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    for (let i = 0; i < length; i++) {
      let row = table.insertRow(i+1);
      for (let i = 0; i < 4; i++) {
        row.insertCell(i);
      }
      var td = row.getElementsByTagName("td");
      let position = constructors[year][i].position;
      let team = constructors[year][i].team;
      let points = constructors[year][i].points;

      console.log("Inserting:", position, team, points);

      td[0].innerHTML = position;
      td[1].innerHTML = year;
      td[2].innerHTML = team;
      td[3].innerHTML = points;
    }
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("drivers").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      showdrivers();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("constructors").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      showconstructors();
    }
  });
});