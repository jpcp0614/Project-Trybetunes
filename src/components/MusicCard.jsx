import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false, // início dos states
      isChecked: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  // Função para requisitar a API
  async onInputChange() {
    const { music } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong(music);
    this.setState({
      isLoading: false, // atualizar enquanto espera a API
      isChecked: true,
    });
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { isLoading, isChecked } = this.state;
    if (isLoading) return <Loading />;
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
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ isChecked }
            onChange={ this.onInputChange }
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
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
