import React, {Component} from 'react';

export default class FileUpload extends Component {

  handleSelectedFile = (event) => {
    this.props.fileSelected(event);
    //send to backend
  }

  render() {
    return (
      <input type="file" name="" id="" onChange={this.handleSelectedFile} />
    )
  }
}