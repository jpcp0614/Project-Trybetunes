import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '', // input com o nome do artista, inicialmente vazio
      source: true, // pesquisa está desabilitada - linha 44
    };
    this.onChangeInputArtist = this.onChangeInputArtist.bind(this);
  }

  // Função para o Input do Pesquisar
  onChangeInputArtist({ target }) {
    this.setState({
      artist: target.value, // atualizo o valor digitado no input
    }, this.verifyArtistInput); // funcao de verificar o input com o nome do artista
  }

  // Função para verificar artista
  verifyArtistInput() {
    const NUMBER_MIN_CHARACTERS = 2;
    const { artist } = this.state;
    const lengthNameArtist = artist.length >= NUMBER_MIN_CHARACTERS;
    this.setState({
      source: !lengthNameArtist, // se for >= 2, habilita o botão
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
            onChange={ this.onChangeInputArtist }
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
