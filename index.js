const map = L.map("map").setView([40.7128, -74.006], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);
let marker = L.marker([40.7128, -74.006]).addTo(map);

document.getElementById("search-btn").addEventListener("click", function () {
  const ipInput = document.getElementById("ip-input").value;
  if (ipInput) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_9SHdVhnlhQbUXPcVL3twn7WbIg1d3&ipAddress=${ipInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("ip-address").innerText = data.ip;
        document.getElementById(
          "location"
        ).innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        document.getElementById(
          "timezone"
        ).innerText = `UTC ${data.location.timezone}`;
        document.getElementById("isp").innerText = data.isp;
        const lat = data.location.lat;
        const lng = data.location.lng;
        updateMap(lat, lng);
      })
      .catch((error) => console.error("Error fetching IP data:", error));
  }
});

function updateMap(lat, lng) {
  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}
