import React, { Component } from 'react';
import getMusicsFunc from '../services/musicsAPI';
import Header from '../components/Header';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  // 

  // Função com as informações dos álbuns
  showAlbumInfo() {
    const { musics } = this.state;
    if (musics.length > 0) {
      const imgUrl = musics[0].artworkUrl100;
      const imgAlt = musics[0].collectionName;
      const artist = musics[0].artistName;
      return (
        <div>
          <img src={ imgUrl } alt={ imgAlt } />
          <h3 data-testid="artist-name">{ artist }</h3>
          <p data-testid="album-name">{ imgAlt }</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        { this.showAlbumInfo() }
      </div>
    );
  }
}

export default Album;
