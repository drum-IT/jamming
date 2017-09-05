const redirectURI = 'http://localhost:3000/';
const clientID = 'bc20b6ed08594972ab593924228b0b71';
let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) !== null && window.location.href.match(/expires_in=([^&]*)/) !== null) {
      let url = window.location.href;
      accessToken = url.match(/access_token=([^&]*)/);
      let expiresIn = url.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else if (window.location.href.match(/access_token=([^&]*)/) === null && accessToken !== '') {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  }
  search(term) {
    
  }
};

export default Spotify;