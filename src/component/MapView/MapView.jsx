import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import PopupList from '../PopupList/PopupList';
import MarkerTable from '../MarkerTable/MarkerTable';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../App.css';

const MAPBOX_TOKEN = "pk.eyJ1IjoieGFwb3hhIiwiYSI6ImNsNWJlaHV4bDA2c20zZmwxYmw4Y3kzamsifQ.K-JWguFPkg2fPIE70FcpMw";

function MapView({ mapStyle }) {
  const [markerList, setMarkerList] = useState(null);
  const [idMarker, setIdMarker] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const [location] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14
  })

  const getLocationClick = (e) => {
    const id = Date.now();
    setMarkerList({ ...markerList, [id]: { ...e.lngLat, color: "black" } });
  }

  const onMarkerDragStart = (id) => {
    setIdMarker(id);
  }

  const onMarkerDragEnd = (e) => {
    setMarkerList({
      ...markerList, [idMarker]: { ...markerList[idMarker], ...e.lngLat }
    });
  }

  const isOpenMenu = (e, id, { lng, lat }) => {
    e.originalEvent.stopPropagation();
    setPopup({ lng, lat, id });
    setIsOpen(true);
  }

  const onChangeColor = (id, color) => {
    let _markerList = { ...markerList };
    delete _markerList[id];

    const _id = Date.now();

    setMarkerList({
      ..._markerList, [_id]: { ...markerList[id], color }
    });

    setIsOpen(false);
  }

  const removeMarker = (id) => {
    let _markerList = { ...markerList };
    delete _markerList[id];

    setMarkerList(_markerList);
    setIsOpen(false);
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
      >
        {markerList && (Object.entries(markerList).map(([id, item]) =>
          <Marker
            key={id}
            longitude={item.lng}
            latitude={item.lat}
            color={item.color}
            draggable
            onClick={(e) => isOpenMenu(e, id, item)}
            onDragStart={() => onMarkerDragStart(id)}
            onDragEnd={onMarkerDragEnd} />
        ))
        }
        {isOpen && (
          <Popup
            anchor="top"
            longitude={popup.lng}
            latitude={popup.lat}
            onClose={() => setIsOpen(false)}>
            <PopupList
              onRemove={() => removeMarker(popup.id)}
              onChangeColor={(color) => onChangeColor(popup.id, color)}
            />
          </Popup>
        )}

        {markerList &&
          <MarkerTable markerList={markerList} />
        }
      </Map>

    </div >
  )
}

export default MapView