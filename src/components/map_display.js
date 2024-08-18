import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function displayMap(lat = 0.0, lon = 0.0) {
  let element = document.getElementById('map');

  if (element.classList.value.includes('leaflet-container')) {
    const newElement = document.createElement('div');
    newElement.id = 'map';
    element.parentElement.replaceChild(newElement, element);
    element = newElement;
  }

  const mainLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  const precipLayer = L.tileLayer(
    'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_L2_Chlorophyll_A/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
    {
      attribution:
        'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
      bounds: [
        [-85.0511287776, -179.999999975],
        [85.0511287776, 179.999999975],
      ],
      minZoom: 1,
      maxZoom: 7,
      format: 'png',
      time: '',
      tilematrixset: 'GoogleMapsCompatible_Level',
      opacity: 0.75,
    }
  );

  const map = L.map(element, {
    center: [lat, lon],
    layers: [mainLayer, precipLayer],
    zoom: 7,
    dragging: false,
    scrollWheelZoom: 'center',
  });

  setTimeout(function () {
    map.invalidateSize();
  }, 100);

  const markerIcon = L.icon({
    iconUrl: 'src/icons/marker.png',
    iconSize: [25, 41],
    shadowUrl: '',
  });

  L.marker([lat, lon], { icon: markerIcon }).addTo(map);
}
