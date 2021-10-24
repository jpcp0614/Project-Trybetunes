import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

// Para resolver o requisito 7, tive a ajuda dos meus amigos Denis, Arthur, Leonardo, Flavio e Fernando

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicsList: [], // inicia com array vazio
      musicsFavorites: [],
      isLoading: false,
    };
    this.getMusics = this.getMusics.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.checkedFavorite = this.checkedFavorite.bind(this);
  }

  componentDidMount() {
    this.getMusics();
    this.onMusicFavorite();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { musicsFavorites } = this.state;
    if (prevState.musicsFavorites !== musicsFavorites) { // estado anterior diferente do array de favoritas, para atualizar o state
      this.checkedFavorite();
    }
  }

  async onMusicFavorite() {
    this.setState({
      isLoading: true,
    });
    const getFavorite = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      musicsFavorites: getFavorite,
    });
  }

  // Função para requisitar a API
  async getMusics() {
    const { match: { params: { id } } } = this.props;

    const response = await getMusics(id); // buscar com o id
    this.setState({
      isLoading: false,
      musicsList: [...response],
    });
  }

  // Função para o check de Favorita
  checkedFavorite() {
    const { musicsFavorites } = this.state;
    musicsFavorites.forEach(({ trackId }) => {
      const getID = document.getElementById(`${trackId}`); // selecionar o id
      if (getID) {
        getID.checked = 'true';
      }
    });
  }

  // Função para renderizar informações
  renderInfo() {
    const { musicsList } = this.state;
    if (musicsList.length > 0) {
      const { artworkUrl100 } = musicsList[0];
      const { collectionName } = musicsList[0];
      const { artistName } = musicsList[0];

      return (
        <section>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h4 data-testid="artist-name">{ artistName }</h4>
          <span data-testid="album-name">{ collectionName }</span>
        </section>
      );
    }
  }

  render() {
    const { musicsList, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        { this.renderInfo() }
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
