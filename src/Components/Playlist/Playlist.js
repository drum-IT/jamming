import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event) {
    console.log(event.target);
    this.props.onNameChange(event.target.value);
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.name} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.tracks} isRemoval={true} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
