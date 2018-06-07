import React, { Component } from 'react';
import '../App.css';
import Nav from './Nav'
import hogs from '../porkers_data';
//import hogImg from '../hog-imgs/cherub'

const key = ""
const URL = `http://api.giphy.com/v1/gifs/search?q=pigs&api_key=${key}&limit=13`;

class App extends Component {
  state = {
    hogs: hogs,
    style: true
  }

  click = (e) => {
    const hogFind = hogs.find((hog) => e.target.innerText === hog.name)
    e.target.innerHTML += `<br/>${hogFind.specialty}<br/>`
    e.target.innerHTML += `Greased: ${hogFind.greased}<br/>`
    e.target.innerHTML += `weight ${hogFind['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}<br/>`
    e.target.innerHTML += `Best Medal: ${hogFind['highest medal achieved']}<br/>`
  }

  weightSorter = (e) => {
    const newHogs = [...hogs].sort((a, b) => {
      return a.weight - b.weight
    })

    this.setState({
      hogs: newHogs
    })
  }

  nameSorter = (e) => {
    const newHogs = [...hogs].sort((a, b) => {
      return (a.name).localeCompare(b.name)
    })

    this.setState({
      hogs: newHogs
    })
  }

  greaseFilter = (e) => {
    const filteredHogs = [...hogs].filter(hog => {
      return hog.greased === true
    })
    this.setState({
      hogs: filteredHogs
    })
  }

  hide = (e) => {
    this.setState({
      style: false
    })
  }

  reload = (e) => {
    window.location.reload()
  }

  giphizer = (e) => {
    var images = [...(document.getElementsByTagName('img'))]
    // fetch(URL).then(r => r.json()).then(pigs =>{
    for(let i=0; i < 13; i++){
      images[i].setAttribute('src', 'https://media.giphy.com/media/BdKPRnowkqtzy/giphy.gif' )
      // fetch(pigs.data[i].url, {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*'
      //   },
      //   mode: 'no-cors'
      // }).then(res => {
      //   console.log('res', res);
      // })

    }
  // })
  }

  render() {
    return (
      <div className="App">
          < Nav />
        <button onClick={this.reload}>Reset</button>
        <button onClick={this.weightSorter} name="weight">Sort By Weight</button>
        <button onClick={this.giphizer}>Change Into GIFs</button>
        <button onClick={this.nameSorter} name="name">Sort By Name</button>
        <button onClick={this.greaseFilter}>Filter Greased Hogs</button>
        <div className="ui-grid-container" >
          {this.state.hogs.map(hog => {
            const imgName = hog.name.replace(/\s/g, "_").toLowerCase()
            return (
              <div style={{display: this.state.style ? 'block' : 'none' }} className='ui-eight-wide-column' key={hog.name}>
                <img src={require(`../hog-imgs/${imgName}.jpg`)} /><br />
                <p onClick={this.click}>{hog.name}</p><button onClick={this.hide}>Hide Hog</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
