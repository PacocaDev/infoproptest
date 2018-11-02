import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'reactstrap';
import FileUpload from './components/FileUpload';
import CustomMap from './components/CustomMap';
import Papa from 'papaparse';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFile: null }
  }

  postDataRequest = (data) => {
    const request = require('request')
    request({ method: 'POST', uri: `http://localhost:3000/v1/real-state`, json: true, body: data }, (error, response, body) => {
      //this.setState({error: error, response: response, body: JSON.parse(body)})
      console.log('AQUI', { error: error, response: response, body: body });
    })
  }

  handleSelectedFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      encoding: 'utf-8',
      complete: (results) => {
        results.errors.length > 0 ?
          console.log('Errors on parsing', results.errors) :
          this.setState({ parsedData: results.data });
        this.postDataRequest(results.data);
      }
    });
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  render() {
    console.log('STATE', this.state);
    return (
      <Fragment>
        <Helmet>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossorigin="" />
          <link rel="stylesheet" href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css" />
        </Helmet>
        <Container >
          <Row style={{ margin: '2rem' }}>
            <Col md="6">
              <Row>
                Anexar Arquivo:
                <span style={{ color: 'red' }}>*</span>
              </Row>
              <FileUpload fileSelected={this.handleSelectedFile} />
              <Row>
              </Row>
              <span style={{ color: 'gray', fontStyle: 'italic' }}>Insira arquivos preferencialmente no formato Excel</span>
              <Row>
              </Row>
            </Col>
          </Row>
          <Row>
            <CustomMap data={this.state.parsedData} />
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
