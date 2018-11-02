import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'reactstrap';
import FileUpload from './components/FileUpload';
import CustomMap from './components/CustomMap';
import Papa from 'papaparse';
import MDSpinner from "react-md-spinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFile: null, loading: false }
  }

  updateDatabase = (data) => {
    const ip = 'http://18.220.185.47';
    var rp = require('request-promise');
    rp({method:'POST',uri:`${ip}/v1/real-state`,json: true, body:data})
      .then((parsedBody) =>{
        rp({uri:`${ip}/v1/real-state`,json: true})
        .then((result) => {
          this.setState({parsedData: result});
          this.setState({loading: false});
        })
        .catch((err) => {
          console.log('GET data failed... ',err)
          this.setState({loading: false});
        });
      })
      .catch((err) =>{
        console.log('POST data failed... ',err)
        this.setState({loading: false});
      });
}

  handleSelectedFile = (event) => {
    this.setState({loading: true});
    Papa.parse(event.target.files[0], {
      header: true,
      encoding: 'utf-8',
      complete: (results) => {
        if (results.errors.length > 0) {
          console.log('Errors on parsing', results.errors);
          this.setState({loading: false});
        } else {
          this.updateDatabase(results.data);
        }  
      }
    });
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  render() {
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
            {this.state.loading ?
              <MDSpinner />
            :
              <Fragment>
                <Row>
                      Anexar Arquivo:
                      <span style={{ color: 'red' }}>*</span>
                    </Row>
                    <Row>
                    <FileUpload fileSelected={this.handleSelectedFile} />
                    </Row>
                    <Row>
                    <span style={{ color: 'gray', fontStyle: 'italic' }}>Insira arquivos preferencialmente no formato Excel</span>
                </Row>
              </Fragment>
            }  
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
