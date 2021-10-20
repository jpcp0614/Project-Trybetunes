import React, { Component } from 'react';
import getMusicsFunc from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
    this.showAlbumInfo = this.showAlbumInfo.bind(this);
  }

  // 

  // Função com as informações dos álbuns
  showAlbumInfo() {
    const { musics } = this.state;
    if (musics.length > 0) {
      const imgUrl = musics[0].artworkUrl100; // imagem
      const imgAlt = musics[0].collectionName; // nome do album
      const artist = musics[0].artistName; // nome do artista
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
        { musics.slice(1) // pegar o array do map a partir do indice 1
          .map((track) => (
            <MusicCard
              key={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
            />
          )) }
      </div>
    );
  }
}

export default Album;
