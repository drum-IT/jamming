import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
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
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.updatePlaylistName('New Playlist');
      this.setState({
        searchResults: []
      })
    })
  }
  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
