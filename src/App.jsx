import React,{Component} from 'react';
import {FormGroup,FormControl,InputGroup, Glyphicon} from 'react-bootstrap'
import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search(){
    const BASE_URL = 'https://api.spotify.com/v1/search?'
    let FETCH_URL = `${BASE_URL}q=${this.state.query.replace(/\s/g, '+')}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    const TOKEN = 'BQAS_VrmkSqqfzI_aUyP75jw4X8sWRFYxkHeRz75drZXwpad7JBRkgvOivAxzRUgE1ywLQ0TNcB6SIEfRY1GOl9Dy-HwWzAQecFXOk41PPjcA5Qv4pe_fCZNBolkxgA0DNYIUdhgPlsiWstvrQDvSmsrhNQYc6F7Zg';
    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
       'Authorization': 'Bearer ' + TOKEN,
      }
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=CO&`;
      fetch(FETCH_URL,{
        method: 'GET',
        headers: {
         'Authorization': 'Bearer ' + TOKEN,
        }
      })
      .then(response => response.json())
      .then(json => {
        const {tracks} = json;
        this.setState({tracks});
      });
    });
  }

  render() {
    return(
      <div className="App">
        <div className="App-tittle">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search an artist..."
              value={this.state.query}
              onChange={event=>{this.setState({query:event.target.value})}}
              onKeyPress={event=>{
                if(event.key === 'Enter'){
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={()=>this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ? <div>
              <Profile
                artist={this.state.artist}
                />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
