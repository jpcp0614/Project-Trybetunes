import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false, // o loading aparece?
      isChecked: false, // está marcado?
    };
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  // Função para adicionar as músicas na lista de favoritas
  // Mesma ideia do async await do Search
  async onChangeInput() {
    const { music } = this.state;
    this.setState({
      isLoading: true,
    });
    await addSong(music);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { isLoading, isChecked } = this.state;
    if (isLoading) return (<Loading />); // mensagem Carregando...
    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            checked={ isChecked }
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
            onChange={ this.onChangeInput }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number, // adicionar PropTypes da trackId
  }).isRequired,
};

export default MusicCard;
