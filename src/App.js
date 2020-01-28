import React, { Component } from 'react';
import './assets/styles/App.scss';


class App extends Component {
  componentDidMount() {
    this.tabDays() 
  }
  
  tabDays = () => {
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => tabContent.classList.remove('active'))
        tabs.forEach(tab => tab.classList.remove('active'))
        tab.classList.add('active')
        target.classList.add('active')
      })
    })
  }

  render() {
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
  
        <ul className="tabs">
          <li className="tab active" data-tab-target="#tab-today">Hari ini</li>
          <li className="tab" data-tab-target="#tab-tomorow">Besok</li>
          <li className="tab" data-tab-target="#tab-after-tomorow">30 Jan</li>
        </ul>
        <div className="tab-content">
          <div id="tab-today" className="active" data-tab-content>
            <table>
              <tbody>
                <tr>
                  <td>Sekarang</td>
                  <td>Berawan</td>
                  <td>24 </td>
                </tr>
                <tr>
                  <td>21.00</td>
                  <td>Berawan</td>
                  <td>22 </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="tab-tomorow" data-tab-content>
            <table>
              <tbody>
                <tr>
                  <td>00.00</td>
                  <td>Berawan</td>
                  <td>24 </td>
                </tr>
                <tr>
                  <td>03.00</td>
                  <td>Berawan</td>
                  <td>21 </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="tab-after-tomorow" data-tab-content>
            <table>
              <tbody>
                <tr>
                  <td>00.00</td>
                  <td>Hujan</td>
                  <td>20 </td>
                </tr>
                <tr>
                  <td>03.00</td>
                  <td>Berawan</td>
                  <td>22 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
