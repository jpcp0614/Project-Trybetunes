import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumAPI from '../services/searchAlbumsAPI';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '', // valor inicial do compo input de pesquisa -> para o requisito 6, mudei de artist para search
      disabledButtonSource: true, // desabilitado - linha 44
      loading: false,
      lastSearch: '',
      arrayAlbum: [],
    };
    this.onChangeInputArtist = this.onChangeInputArtist.bind(this);
  }

  // Função para o Input do Pesquisar
  onChangeInputArtist({ target }) {
    this.setState({
      search: target.value, // atualizo o valor digitado no input
    }, this.verifyArtistInput); // funcao de verificar o input com o nome do artista
  }

  // Função para verificar artista
  verifyArtistInput() {
    const NUMBER_MIN_CHARACTERS = 2;
    const { search } = this.state;
    const lengthNameArtist = search.length >= NUMBER_MIN_CHARACTERS;
    this.setState({
      disabledButtonSource: !lengthNameArtist, // se for >= 2, habilita o botão
    });
  }

  // Função para pesquisar o álbum do artista
  async searchAlbumArtist() {
    const { search } = this.state;
    this.setState({
      loading: true,
      lastSearch: search,
    });

    const response = await searchAlbumAPI(search); // esperar a API
    this.setState({
      arrayAlbum: [...response], // 'pego' todo os albuns
      search: '', // limpo o campo de pesquisa
      loading: false, // paro com a msg Carregando...
    });
  }

  // Função do resultado da pesquisa do album
  albumSearchResult() {
    const { arrayAlbum, lastSearch } = this.state;
    if (arrayAlbum.length === 0) {
      return <p>Nenhum álbum encontrado</p>; // caso não encontre o album pesquisado
    }
    return (
      <section>
        <p>{`Resultado de álbuns de: ${lastSearch}`}</p>
        {/* encontrando o album, fazer um map para listar os albuns na tela */}
        {arrayAlbum.map((album) => (
          <Link
            key={ album.collectionId }
            data-testid={ `link-to-album-${album.collectionId}` }
            to={ `link-to-album-${album.collectionId}` }
          >
            <ul>{album.collectionName}</ul>
            {/* lista de nomes de albuns */}
          </Link>
        ))}
      </section>
    );
  }

  render() {
    const { disabledButtonSource, loading, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? (<Loading />) : (
          <form>
            <input
              data-testid="search-artist-input"
              onChange={ this.onChangeInputArtist }
              type="text"
            />

            <button
              data-testid="search-artist-button"
              disabled={ disabledButtonSource }
              type="submit"
            >
              Pesquisar
            </button>
          </form>
        )}
        { this.albumSearchResult() }
      </div>
    );
  }
}

export default Search;
