mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/satellite-v9', // style URL
  center: post.geometry.coordinates,
  zoom: 4,
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

new mapboxgl.Marker()
  .setLngLat(post.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${post.title}</h3><p>${post.location}</p>`
    )
  )
  .addTo(map);
