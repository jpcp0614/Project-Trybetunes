import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      source: true,
    };
  }

  // Função para verificar artista
  verifyArtistInput() {
    const NUMBER_MIN_CHARACTERS = 2;
    const { artist } = this.state;
    const lengthNameArtist = artist.length >= NUMBER_MIN_CHARACTERS;
    this.setState({
      source: !lengthNameArtist, // se for >= 3 caracteres, botao habilitado
    });
  }

  render() {
    const { source } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
          />

          <button
            data-testid="search-artist-button"
            disabled={ source }
            type="submit"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
