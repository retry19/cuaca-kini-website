import React, { Component } from 'react'
import Provinces from './utils/Provinces'
import './assets/styles/App.scss'


class App extends Component {
  state = {
    provinceSelected: null,
    citySelected: null,
  }

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

  handleProvincesChange = (e) => {
    const province = e.target.value.replace(/\s/g, '')
    const url = `http://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-${province}.xml`
    console.log(url)
  }

  render() {
    return (
      <div className="App">
        
        <div id="bg"></div>
  
        <nav>
          <a href="./">CuacaKini</a>
          <span className="github"></span>
        </nav>
  
        <section id="input">
          <select name="province" value={this.provinceSelected} defaultValue={'DEFAULT'} onChange={this.handleProvincesChange}>
            <option value="DEFAULT" disabled>Pilih nama provinsi anda</option>
            { Provinces.map(province => <option key={province} value={province}>{province}</option>) }
          </select>

          <select name="city" value={this.citySelected} defaultValue={'DEFAULT'}>
            <option value="DEFAULT" disabled>Pilih nama kota anda</option>
            <option value="Bandung">Bandung</option>
            <option value="Kuningan">Kuningan</option>
          </select>
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
