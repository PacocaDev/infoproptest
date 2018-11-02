import React, {Component, Fragment} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default class CustomMap extends Component {
  render() {
    console.log(this.props.data);
    return (
        <Map center={[-23.603773, -46.625290]} zoom={12} maxZoom={18} style={{height: '40rem'}}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
            <MarkerClusterGroup>
          {this.props.data &&   
          this.props.data.map((value) => {
              if(value.latitude && value.longitude) {
                const coordinate = [parseFloat(value.latitude), parseFloat(value.longitude)]
                return (
                  <Marker position={coordinate}>
                    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                  </Marker>
                )
              } else {
                return null
              }
          })
        }
        </MarkerClusterGroup>
        </Map>
    )
  }
}