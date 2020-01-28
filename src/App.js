import React from 'react';
import './assets/styles/App.scss';

function App() {
  return (
    <div className="App">
      
      <div id="bg"></div>

      <nav>
        <a href="#">CuacaKini</a>
        <span className="github"></span>
      </nav>

      <section id="input">
        <input list="provinsi" name="provinsi" placeholder="Pilih nama provinsi anda" />
        <datalist id="provinsi">
          <option value="Jawa Barat">Jawa Barat</option>
          <option value="Jawa Timur">Jawa Timur</option>
        </datalist>

        <input list="kota" name="kota" placeholder="Pilih nama kota anda" />
        <datalist id="kota">
          <option value="Bandung">Bandung</option>
          <option value="Kuningan">Kuningan</option>
        </datalist>
      </section>


      <div className="sun">
        <div className="mainInfo">
          <h1>26</h1>
          <p>Cerah</p>
          <div className="location">
            Kuningan, Jawa Barat
          </div>
        </div>
        <div id="sun"></div>
      </div>
    </div>
  );
}

export default App;
