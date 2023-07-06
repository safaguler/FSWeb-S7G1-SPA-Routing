import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import FilmListesi from './Filmler/FilmListesi.js';
import Film from './Filmler/Film.js';
import FilmCard from './Filmler/FilmCard.js';
export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          console.log('Alınan yanıt:', response);
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  

  const KaydedilenlerListesineEkle = id => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    if (!saved.includes(id)) {
      setSaved([...saved, id]);
    }
  };

  return (
    <Router>
    <div>
      <KaydedilenlerListesi list={saved} />
      

      
      <Switch>
      <Route exact path="/" render={(props) => <FilmListesi {...props} movies={movieList} />} />
          <Route path="/filmler/:id" render={(props) => <Film {...props} KaydedilenlerListesi={KaydedilenlerListesi} />} />
      </Switch>
    
    </div>
    </Router>
  );
}
