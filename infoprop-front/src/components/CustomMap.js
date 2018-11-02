import React, {Component} from 'react';
import {Map, Marker, TileLayer,Tooltip} from 'react-leaflet';
import styled from 'styled-components';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



export default class CustomMap extends Component {
  
  //filter absurd coordinates
  validCoordinates = (latitude, longitude) => {
    return latitude &&
           longitude &&
           (parseFloat(latitude) < -22.0) &&
           (parseFloat(latitude) > -25.0) &&
           (parseFloat(longitude) < -45.0) &&
           (parseFloat(longitude) > -48.0);
  
  }

  render() {
    const saoPaulo = [-23.603773, -46.625290];
    return (
        <Map center={saoPaulo} zoom={12} maxZoom={18} style={{height: '40rem'}}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
            <MarkerClusterGroup>
          {this.props.data &&   
          this.props.data.map((value) => {
              if(this.validCoordinates(value.latitude,value.longitude)) {
                const coordinate = [parseFloat(value.latitude), parseFloat(value.longitude)]
                return (
                  <Marker position={coordinate}>
                    <Tooltip>
                      {value.condominio &&
                      <div style={{fontWeight: 'bold', marginBottom: '1rem'}}>{value.condominio}</div>}
                      {value.rua &&
                      <Attribute><span style={{marginRight: '2rem', fontWeight: 'bold'}}>Rua/Av.:</span><span>{value.rua}</span></Attribute>}
                      {value.numero &&
                      <Attribute><span style={{marginRight: '2rem', fontWeight: 'bold'}}>Numero:</span>{value.numero}</Attribute>}
                      {value.bairro &&
                      <Attribute><span style={{marginRight: '2rem', fontWeight: 'bold'}}>Bairro:</span>{value.bairro}</Attribute>}
                      {value.area &&
                      <Attribute><span style={{marginRight: '2rem', fontWeight: 'bold'}}>Área em M²:</span>{value.area}</Attribute>}
                      {value.rooms &&
                      <Attribute><span style={{marginRight: '2rem', fontWeight: 'bold'}}># Quartos:</span>{value.rooms}</Attribute>}
                      {value.bathrooms &&
                      <Attribute><span style={{marginRight: '2rem', fontWeight: 'bold'}}># Banheiros:</span>{value.bathrooms}</Attribute>}
                      {value.garage &&
                      <Attribute><span style={{marginRight: '2rem', fontWeight: 'bold'}}># Vagas de garagem:</span>{value.garage}</Attribute>}
                    </Tooltip>
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

const Attribute = styled.div`
  display: flex;
  justify-content: space-between;
`