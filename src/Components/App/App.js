import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.state = {
      searchResults: [{name: 'test name search',artist: 'test artist search',album: 'test album search', id: '123er123r123r'}],
      playlistName: 'playlist name',
      playlistTracks: [{name: 'test name playlist',artist: 'test artist playlist',album: 'test album playlist', id: '12351234raewrf123r'}],
    }
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].id === track.id) {
        console.log('track already in list');
        return;
      }
    }
    tracks.push(track);
    this.setState({
      playlistTracks: tracks
    });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(playlistTrack => {
      return playlistTrack.id !== track.id;
    });
    this.setState({
      playlistTracks: tracks
    })
  }
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span>mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;