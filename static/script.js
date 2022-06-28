const formElement = document.querySelector("form");
const tableBodyElement = document.querySelector("tbody");

const nameInput = document.querySelector("#name-input");
const cordsInput = document.querySelector("#cords-input");

async function getPlaces() {
  const response = await fetch("/database");
  const places = await response.json();
  return places;
}

function updatePlaces() {
  getPlaces().then((places) => {
    tableBodyElement.innerHTML = "";
    places.places.forEach((place) => {
      tableBodyElement.innerHTML += `<tr>
        <th scope="row">${place.name}</th>
        <td>${place.coordinates}</td>
      </tr>`;
    });
  });
}

updatePlaces();

formElement.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const name = nameInput.value;
  const coordinates = cordsInput.value;

  const response = await fetch("/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      coordinates: coordinates,
    }),
  });
  if (response.status == 200) {
    updatePlaces();
  }
});
