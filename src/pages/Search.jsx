import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

// Para fazer o requisito 6, tive ajuda dos amigos na salinha de estudos no Zoom,
// que agradeço muito: Fernando, Denis, Gabrielle, Arthur, Flavio e Laurenz. OBRIGADO!!! OK!

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '', // valor inicial do compo input de pesquisa -> para o requisito 6, mudei de artist para search
      isDisabledButtonSource: true, // desabilitado - linha 44...refatorando
      isLoading: false, // refatorando
      lastSearch: '',
      arrayAlbum: [],
    };
    this.onChangeInputArtist = this.onChangeInputArtist.bind(this);
    this.searchAlbumArtist = this.searchAlbumArtist.bind(this);
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
      isDisabledButtonSource: !lengthNameArtist, // se for >= 2, habilita o botão
    });
  }

  // Função para pesquisar o álbum do artista
  async searchAlbumArtist() {
    const { search } = this.state;
    this.setState({
      isLoading: true,
      lastSearch: search,
    });

    const response = await searchAlbumAPI(search); // esperar a API
    this.setState({
      arrayAlbum: [...response], // 'pego' todo os albuns
      search: '', // limpo o campo de pesquisa
      isLoading: false, // paro com a msg Carregando...
    });
  }

  // Função do resultado da pesquisa do album
  albumSearchResult() {
    const { arrayAlbum, lastSearch } = this.state;
    if (arrayAlbum.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>; // caso não encontre o album pesquisado
    }
    return (
      <section>
        <p>{`Resultado de álbuns de: ${lastSearch}`}</p>
        {/* encontrando o album, fazer um map para listar os albuns na tela */}
        {arrayAlbum.map((album) => (
          <Link
            key={ album.collectionId }
            data-testid={ `link-to-album-${album.collectionId}` }
            to={ `/album/${album.collectionId}` }
          >
            {' '}
            <div>
              <section>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <h3>{album.collectionName}</h3>
              </section>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            </div>
          </Link>
        ))}
      </section>
    );
  }

  render() {
    const { isDisabledButtonSource, isLoading, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? (<Loading />) : (
          <form>
            <input
              data-testid="search-artist-input"
              onChange={ this.onChangeInputArtist }
              type="text"
              value={ search }
            />

            <button
              data-testid="search-artist-button"
              disabled={ isDisabledButtonSource }
              onClick={ this.searchAlbumArtist }
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
