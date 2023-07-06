import React from 'react';
import KaydedilenlerListesi from './KaydedilenlerListesi';
import FilmListesi from './FilmListesi.js';
import Film from './Film.js';

export default function FilmCard (props) {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map((star, index) => (
          <div key={index} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      </div>
   );
 }
 