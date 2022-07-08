import React from 'react';
import { MapProvider } from 'react-map-gl';
import MapView from './component/MapView/MapView'
import './App.css';

function App() {
  return (
    <MapProvider>
      <MapView
        mapStyle="mapbox://styles/mapbox/streets-v9">
      </MapView>
    </MapProvider>
  );
}

export default App;
