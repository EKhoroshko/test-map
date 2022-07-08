import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../App.css'

const MAPBOX_TOKEN = "pk.eyJ1IjoieGFwb3hhIiwiYSI6ImNsNWJlaHV4bDA2c20zZmwxYmw4Y3kzamsifQ.K-JWguFPkg2fPIE70FcpMw";

function MapView({ mapStyle }) {
  const [marker, setMarker] = useState(null);
  const [count, setCount] = useState([]);
  const [idMarker, setIdMarker] = useState();
  const [location, setLocation] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14
  })

  console.log(marker);
  console.log(count);

  const getLocationClick = (e) => {
    e.preventDefault();
    if (e.originalEvent.srcElement.className === 'mapboxgl-canvas') {
      const id = Date.now();
      setMarker({ ...e.lngLat, id });
      setCount([...count, { ...e.lngLat, id }]);
    }
  }

  const onMarkerDragStart = (id) => {
    setIdMarker(id);
  }

  const onMarkerDragEnd = (e) => {
    const updateCount = count.map(item => {
      if (item.id === idMarker) {
        return { ...item, ...e.lngLat }
      }
      return item;
    })
    setCount(updateCount);
  }

  const removeMarker = (id) => {
    console.log(id);
    const updateCount = count.filter(item => item.id !== id);
    setCount(updateCount);
  }

  return (
    <div className='mapBox'>
      <Map
        id="mymap"
        initialViewState={location}
        mapStyle={mapStyle}
        style={{ width: 1200, height: 800 }}
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={getLocationClick}
      >{
          count.length > 0 ? (
            count.map(item =>
              <Marker
                key={item.id}
                id={item.id}
                longitude={item.lng}
                latitude={item.lat}
                color="red"
                draggable
                onClick={() => removeMarker(item.id)}
                onDragStart={() => onMarkerDragStart(item.id)}
                onDragEnd={onMarkerDragEnd} />
            )
          ) : (null)
        }
      </Map>
    </div >
  )
}

export default MapView