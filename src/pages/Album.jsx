import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

// Para resolver o requisito 7, tive a ajuda dos meus amigos Denis, Arthur, Leonardo, Flavio e Fernando

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicsList: [], // inicia com array vazio
    };
    this.getMusics = this.getMusics.bind(this);
  }

  componentDidMount() {
    this.getMusics();
  }

  // Função para requisitar a API
  async getMusics() {
    const { match: { params: { id } } } = this.props;

    const response = await getMusics(id); // buscar com o id
    this.setState({
      musicsList: response,
      artistName: response[0].artistName, // pega a imagem no musics
      collectionName: response[0].collectionName, // album
      albumImage: response[0].artworkUr100, // artista
    });
  }

  render() {
    const { musicsList, artistName, collectionName, albumImage } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <img src={ albumImage } alt={ collectionName } />
          <h4 data-testid="artist-name">{ artistName }</h4>
          <span data-testid="album-name">{ collectionName }</span>
        </section>
        {musicsList
          .slice(1)
          .map((music, index) => <MusicCard key={ index } music={ music } />)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
