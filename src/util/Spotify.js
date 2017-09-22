const redirectURI = 'http://localhost:3000/';
const clientID = 'bc20b6ed08594972ab593924228b0b71';
let accessToken = '';

const Spotify = {
  getAccessToken() {
    const tokenRegEx = /access_token=([^&]*)/;
    const expireRegEx = /expires_in=([^&]*)/;
    if (accessToken !== '') {
      return new Promise(resolve =>
        resolve(accessToken));
    } else if (window.location.href.match(tokenRegEx) !== null && window.location.href.match(expireRegEx) !== null) {
      accessToken = window.location.href.match(tokenRegEx)[1];
      let expireTime = parseInt(window.location.href.match(expireRegEx)[1]);
      window.setTimeout(() => accessToken = '', expireTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return new Promise(resolve =>
        resolve(accessToken));
    } else if (accessToken === '' && window.location.href.match(tokenRegEx) === null) {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search(term) {
    return Spotify.getAccessToken().then(() => {
      return fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        }
      ).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.tracks.items.length > 0) {
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          });
        } else {
          return [];
        }
      });
    })
  },
  savePlaylist(name, URIs) {
    if (name !== '' && URIs !== '') {
      const userToken = accessToken;
      const headers = {'Authorization': 'Bearer ' + userToken};
      let userID = '';
      return fetch(
        'https://api.spotify.com/v1/me',
        {headers: headers}
      ).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userID = jsonResponse.id;
      }).then(() => {
        return fetch(
          `https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + userToken
            },
            body: JSON.stringify({name: name})
          }
        ).then(response => {
          return response.json();
        }).then(jsonResponse => {
          return jsonResponse.id;
        }).then(playlistID => {
          return fetch(
            `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
            {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + userToken,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({uris: URIs})
            }
          ).then(response => {
            return response.json();
          }).then(jsonResponse => {
            let playlistID = jsonResponse.snapshot_id;
          })
        })
      })
    } else {
      return;
    }
  }
};

export default Spotify;
