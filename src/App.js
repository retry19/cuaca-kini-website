import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Provinces from './utils/Provinces'
import XmlToJson from './utils/XmlToJson'
import './assets/styles/App.scss'


class App extends Component {
  state = {
    provinceSelected: null,
    citySelected: null,
    mainWeather: null,
    dataWeather: [],
    province: null,
    mainTemp: null,
    weathers: [],
    city: null,
    temps: [],
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

  handleProvincesChange = async (e) => {
    this.setState({province: e.target.value})

    const province = e.target.value.replace(/\s/g, '')
    const url = `http://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-${province}.xml`
    
    await axios.get(url)
      .then(res => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(res.data, 'text/xml')
        const data = XmlToJson(xml)
        this.setState({ dataWeather: data.data.forecast.area })})
      .catch(err => 
        console.log(err))
  }

  handleCityChange = async (e) => {
    const key = e.target.value
    await this.setState({
      city: Object.values(this.state.dataWeather[key].name[0])[1],
      weathers: this.state.dataWeather[key].parameter[6].timerange,
      temps: this.state.dataWeather[key].parameter[5].timerange
    })

    const timeNow = moment().format('H')
    let indexTemp = 0
    
    if (timeNow >= 0 && timeNow < 6) { 
      indexTemp = 0
    } else if (timeNow >= 6 && timeNow < 12) { 
      indexTemp = 1 
    } else if (timeNow >= 12 && timeNow < 18) {
      indexTemp = 2
    } else if (timeNow >= 18 && timeNow < 24) {
      indexTemp = 3
    }
    const mainTemp = await Object.values(this.state.temps[indexTemp].value[0])[1]
    const mainWeather = await Object.values(this.state.weathers[indexTemp].value)[1]
    this.setState({ 
      mainTemp: mainTemp,
      mainWeather: mainWeather
    })
    console.log(this.state)
  }

  _weatherCode = (w) => {
    let weather = ''
    if (w === '0' || w === '100') {
      return weather = 'Cerah'
    } else if (w === '1' || w === '101' || w === '2' || w === '102') {
      return weather = 'Cerah Berawan'
    } else if (w === '3' || w === '103') {
      return weather = 'Berawan'
    } else if (w === '4' || w === '104') {
      return weather = 'Berawan Tebal'
    } else if (w === '5') {
      return weather = 'Udara Kabur'
    } else if (w === '10') {
      return weather = 'Asap'
    } else if (w === '45') {
      return weather = 'Kabut'
    } else if (w === '60') {
      return weather = 'Hujan Ringan'
    } else if (w === '61') {
      return weather = 'Hujan Sedang'
    } else if (w === '63') {
      return weather = 'Hujan Lebat'
    } else if (w === '80') {
      return weather = 'Hujan Lokal'
    } else if (w === '95' || w === '97') {
      return weather = 'Hujan Petir'
    } 
  }

  render() {
    return (
      <div className="App">
        
        <div id={ moment().format('HH') < 18 && moment().format('HH') >= 6 ? 'bg' : 'bg-dark'}></div>
  
        <nav>
          <a href="./">CuacaKini</a>
          <a href="//github.com/retry19/cuaca-kini-website" className="github" target="_blank"></a>
        </nav>
  
        <section id="input">
          <select name="province" value={this.provinceSelected} defaultValue={'DEFAULT'} onChange={this.handleProvincesChange}>
            <option value="DEFAULT" disabled>Pilih nama provinsi anda</option>
            { Provinces.map(province => <option key={province} value={province}>{province}</option>) }
          </select>

          <select name="city" value={this.citySelected} defaultValue={'DEFAULT'} onChange={this.handleCityChange} style={{ display: this.state.dataWeather.length !== 0 ? 'block' : 'none'}}>
            <option value="DEFAULT" disabled>Pilih nama kota anda</option>
            { this.state.dataWeather.map((item, key) => <option key={key} value={key}>{item.attr.description}</option>) }
          </select>
        </section>
  
        <div className="sun" style={{ display: this.state.mainTemp !== null ? 'block' : 'none' }}>
          <div className="mainInfo">
            <h1>{ this.state.mainTemp }</h1>
            <p>{ this.state.mainWeather !== null ? this._weatherCode(this.state.mainWeather) : '' }</p>
            <div className="location">
              { this.state.city }, { this.state.province }
            </div>
          </div>
          <div id={ moment().format('HH') < 18 && moment().format('HH') >= 6 ? 'sun' : 'moon'}></div>
        </div>
  
        <ul className="tabs" style={{ display: this.state.mainTemp !== null ? 'flex' : 'none' }}>
          <li className="tab active" data-tab-target="#tab-today">Hari ini</li>
          <li className="tab" data-tab-target="#tab-tomorow">Besok</li>
          <li className="tab" data-tab-target="#tab-after-tomorow">30 Jan</li>
        </ul>
        <div className="tab-content">
          <div id="tab-today" className="active" data-tab-content>
            <table>
              <tbody>
                { 
                  this.state.temps.map((temp, key) => {
                    if (key >= 4) {
                      return true
                    } else {
                      return (
                        <tr key={key}>
                          <td>{moment(temp.attr.h, 'H').format('HH:mm')}</td>
                          { 
                            this.state.weathers.map((w, k) => {
                              if (k == key) 
                                return <td>{this._weatherCode(Object.values(w.value)[1])}</td>
                            }) 
                          }
                          <td>{Object.values(temp.value[0])[1]} </td>
                        </tr>
                      )
                    }
                  }) 
                }
              </tbody>
            </table>
          </div>
          <div id="tab-tomorow" data-tab-content>
            <table>
              <tbody>
                { 
                  this.state.temps.map((temp, key) => {
                    if (key < 4 || key >= 8) {
                      return true
                    } else {
                      return (
                        <tr key={key}>
                          <td>{moment(temp.attr.h - 24, 'H').format('HH:mm')}</td>
                          { 
                            this.state.weathers.map((w, k) => {
                              if (k == key) 
                                return <td>{this._weatherCode(Object.values(w.value)[1])}</td>
                            }) 
                          }
                          <td>{Object.values(temp.value[0])[1]} </td>
                        </tr>
                      )
                    }
                  }) 
                }
              </tbody>
            </table>
          </div>
          <div id="tab-after-tomorow" data-tab-content>
            <table>
              <tbody>
                { 
                  this.state.temps.map((temp, key) => {
                    if (key < 8) {
                      return true
                    } else {
                      return (
                        <tr key={key}>
                          <td>{moment(temp.attr.h - 48, 'H').format('HH:mm')}</td>
                          { 
                            this.state.weathers.map((w, k) => {
                              if (k == key) 
                                return <td>{this._weatherCode(Object.values(w.value)[1])}</td>
                            }) 
                          }
                          <td>{Object.values(temp.value[0])[1]} </td>
                        </tr>
                      )
                    }
                  }) 
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
