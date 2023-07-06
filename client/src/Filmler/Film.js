import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import KaydedilenlerListesi from './KaydedilenlerListesi';
import FilmListesi from './FilmListesi.js';
import FilmCard from './FilmCard.js';

export default function Film(props) {
  
  const [movie, setMovie] = useState(null);
  const [saved, setSaved] = useState(false);
  const { id } = useParams();
  
  // URL'den alınan :id parametresini bu değişkene aktarın

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/filmler/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFilm();
  }, [id]);

  // Yalnızca esnek görevlere geçtiğinizde burdaki yorum etiketini kaldırın
  // const filmiKaydet = evt => { }
  const filmiKaydet = () => {
    setSaved(true);
    console.log('Film kaydedildi!');
  };

  if (!movie) {
    return <div>Film bilgisi yükleniyor...</div>;
  }

  const { title, director, metascore, stars } = movie;

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
      <div className="save-button" onClick={filmiKaydet}>
        {saved ? 'Kaydedildi' : 'Kaydet'}
      </div>
    </div>
  );
}
