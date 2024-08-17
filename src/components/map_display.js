import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function displayMap(lat = 0.0, lon = 0.0) {
  let element = document.getElementById('map');

  if (element.classList.value.includes('leaflet-container')) {
    console.log('exiting container');
    const newElement = document.createElement('div');
    newElement.id = 'map';
    element.parentElement.replaceChild(newElement, element);
    element = newElement;
  }

  const map = L.map(element, {
    center: [lat, lon],
    zoom: 8,
    dragging: false,
    scrollWheelZoom: 'center',
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const markerIcon = L.icon({
    iconUrl: 'src/icons/marker.png',
    iconSize: [25, 41],
    shadowUrl: '',
  });

  L.marker([lat, lon], { icon: markerIcon }).addTo(map);
}
