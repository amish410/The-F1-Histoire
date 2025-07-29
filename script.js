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
    let year = parseInt(document.getElementById("drivers").value);
    if (isNaN(year) || year < 1950 || year > 2020) {
        document.getElementById("drivererror").style.display = "inline";
        return;
    } else {
        document.getElementById("drivererror").style.display = "none";
    }

    let length = drivers[year].length;
    var table = document.getElementById("driversstandings");

    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    for (let i = 0; i < length; i++) {
      let row = table.insertRow(i+1);
      for (let i = 0; i < 6; i++) {
        row.insertCell(i);
      }
      let td = row.getElementsByTagName("td")
      let position = drivers[year][i].position;
      let nation = drivers[year][i].nation;
      let driver = drivers[year][i].driver;
      let team = drivers[year][i].team;
      let points = drivers[year][i].points;

      td[0].innerHTML = position;
      td[1].innerHTML = year;
      td[2].innerHTML = nation;
      td[3].innerHTML = driver;
      td[4].innerHTML = team;
      td[5].innerHTML = points;
    }

    document.getElementById("driverinfo").style.display = "inline";
}

function showconstructors() {
    let year = parseInt(document.getElementById("constructors").value);
    if (isNaN(year) || year < 1958 || year > 2020) {
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
      let td = row.getElementsByTagName("td");
      let position = constructors[year][i].position;
      let team = constructors[year][i].team;
      let points = constructors[year][i].points;

      td[0].innerHTML = position;
      td[1].innerHTML = year;
      td[2].innerHTML = team;
      td[3].innerHTML = points;
    }
    document.getElementById("teaminfo").style.display = "inline";
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

document.addEventListener('DOMContentLoaded', function() {
    fetch('tracks.json')
        .then(response => response.json())
        .then(data => {
          loadtrackdata(data);
        });
});

function loadtrackdata(data) {
  let track_data =  ``
  tracks = data.f1_2025_tracks;
  for (let i = 0; i < tracks.length; i++) {
    track_data += `
      <div class="name">${tracks[i].official_name}</div>
      <div class="location">${tracks[i].location}</div>
      <div class="info">${tracks[i].info}</div>
      <div class="image"> <img id="australia" src="tracks/australia.png" alt="australia" class="rounded-image image-box" style="display: inline-block"> </div>
    `;
  }
    console.log("added track:", track_data);

    document.getElementById("trackinfo").innerHTML = track_data;
}