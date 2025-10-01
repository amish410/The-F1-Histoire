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

function changebackground() {
  let background = document.getElementById("background")
  if (background.style.backgroundImage) {
    background.style = "background-color: #1b1b20;"
  }
  else {
    background.style = "background-image: url('../../f1background.webp'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;"
  }
}

function changebackgroundmainpage() {
  let background = document.getElementById("background")
  if (background.style.backgroundImage) {
    background.style = "background-color: #1b1b20;"
  }
  else {
    background.style = "background-image: url('f1background.webp'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;"
  }
}

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
      <div class="location">${tracks[i].location}, ${tracks[i].date}</div>
      <div class="info">${tracks[i].info}</div>
      <div class="image"> <img id="track" src="${tracks[i].image_link}" alt="track" class="rounded-image image-box" style="display: inline-block"> </div>
      <br>
      `;
  }
    console.log("added track:", track_data);

    document.getElementById("trackinfo").innerHTML = track_data;
}

function loadteamdata(name) {
  let teamname = name;
  let drivers = document.getElementById("driverstable")
  let constructors = document.getElementById("constructorstable")

  fetch('../../teaminfo.json')
   .then(response => response.json())
    .then(data => {
      team = data[teamname];
      document.getElementById("description").innerHTML = team.description;
      document.getElementById("driver1").innerHTML = team.drivers[0].name;
      document.getElementById("driver2").innerHTML = team.drivers[1].name;
      document.getElementById("driver1image").src = team.drivers[0].image;
      document.getElementById("driver2image").src = team.drivers[1].image;

      if (team.championships.special === "This team has no championships.") {
        drivers.remove()
        constructors.remove()
        document.getElementById("numbers").innerHTML = "This team has no championships. Go support them and help them get their first!"
        document.getElementById("driversheading").style.display = "none"
        document.getElementById("constructorheading").style.display = "none"
        return;
      }

      document.getElementById("numbers").innerHTML = `${teamname.charAt(0).toUpperCase()}${teamname.slice(1)} has ${team.championships.drivers} driver championships and ${team.championships.constructors} constructor championships. You can find information about the championships below!`

      while (drivers.rows.length > 1) {
        drivers.deleteRow(1);
      }

      for (let i = 0; i < team.championships.driverDetails.length; i++) {
        let row = drivers.insertRow(1+i);
        for (let i = 0; i < 3; i++) {
          row.insertCell(i);
        }
        
        let td = row.getElementsByTagName("td");
        let year = team.championships.driverDetails[i].year;
        let driver = team.championships.driverDetails[i].driver;
        let points = team.championships.driverDetails[i].points;

        td[0].innerHTML = year;
        td[1].innerHTML = driver;
        td[2].innerHTML = points;
      }


      while (constructors.rows.length > 1) {
        constructors.deleteRow(1);
      }

      for (let i = 0; i < team.championships.constructorDetails.length; i++) {
        let row = constructors.insertRow(1+i);
        for (let i = 0; i < 3; i++) {
          row.insertCell(i);
        }
        
        let td = row.getElementsByTagName("td");
        let year = team.championships.constructorDetails[i].year;
        let driver = team.championships.constructorDetails[i].drivers;
        let points = team.championships.constructorDetails[i].points;

        td[0].innerHTML = year;
        td[1].innerHTML = driver;
        td[2].innerHTML = points;
      }
    })};