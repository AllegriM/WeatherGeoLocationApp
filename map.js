// Map JS

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtb25reTk5IiwiYSI6ImNsMnl1N2h1ZDE5ZHozbG11M3B2djFtZm8ifQ.eKG2t7l6esuwUTbzyTJB_Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
});


function getCoordsClick() {
    map.on('click', (e) => {
    // e.lngLat returns latitude and long values
        let coordsData = e.lngLat;
        // Parse them to 4 decimals to feed function
        let roundLng = parseFloat(coordsData.lng).toFixed(4);
        let roundLat = parseFloat(coordsData.lat).toFixed(4);
        let coords = `${roundLat}, ${roundLng}`
        // console.log(coords)
        getSimpleClimaData(coords)
    });
}

function centerMap(lng, lat) {
    map.flyTo({
        enableHighAccuracy: 5000,
        center: [lng, lat],
        zoom: 10
    });
}
getCoordsClick()