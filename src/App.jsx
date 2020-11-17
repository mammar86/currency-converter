import React, { useEffect, useState } from 'react'

function App() {
  const [dollar, setDollar] = useState(0)
  const [euro, setEuro] = useState(0)
  const [pound, setPound] = useState(0)
  const [CAD, setCAD] = useState(0)
  const [EGP, setEGP] = useState(0)
  const [dollarEuroRate, setDollarEuroRate] = useState(0)
  const [dollarPoundRate, setDollarPoundRate] = useState(0)
  const [dollarCADRate, setDollarCADRate] = useState(0)
  const [dollarEGPRate, setDollarEGPRate] = useState(0)

  exchangeRates()

  useEffect(() => setEuro((dollarEuroRate * dollar).toFixed(2)), [dollar])

  useEffect(() => setPound((dollarPoundRate * dollar).toFixed(2)), [dollar])

  useEffect(() => setCAD((dollarCADRate * dollar).toFixed(2)), [dollar])

  useEffect(() => setEGP((dollarEGPRate * dollar).toFixed(2)), [dollar])

  const dollarInput = (event) => {
    if (event.target.value !== '.' && isNaN(Number(event.target.value))) {
      const error = new Audio(
        'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav'
      )
      error.play()
    } else {
      let inputValueArr = []
      inputValueArr.push(event.target.value)
      const inputValue = inputValueArr.join(',')
      setDollar(inputValue)
    }
  }
  // const euroInput = (event) => {
  //   if (isNaN(Number(event.target.value))) {
  //     const error = new Audio(
  //       'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav'
  //     )
  //     error.play()
  //   } else {
  //     setEuro(Number(event.target.value))
  //   }
  // }
  // const poundInput = (event) => {
  //   if (isNaN(Number(event.target.value))) {
  //     const error = new Audio(
  //       'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav'
  //     )
  //     error.play()
  //   } else {
  //     setPound(Number(event.target.value))
  //   }
  // }

  async function exchangeRates() {
    const url =
      'https://v6.exchangerate-api.com/v6/42bd4a32c3c449ffdc2ffecc/latest/USD'
    const response = await fetch(url)
    const Data = await response.json()
    setDollarEuroRate(Data.conversion_rates.EUR)
    setDollarPoundRate(Data.conversion_rates.GBP)
    setDollarCADRate(Data.conversion_rates.CAD)
    setDollarEGPRate(Data.conversion_rates.EGP)
  }

  return (
    <main>
      <div>
        <h1>Currency converter</h1>
      </div>
      <section>
        <label> US DOLLAR:</label>
        <input type="texts" value={dollar} onChange={dollarInput}></input>
      </section>
      <figure>
        <section className="currency-box">
          <label>EURO</label>
          <p>{euro}</p>
        </section>
        <section className="currency-box">
          <label>BRITISH POUND</label>
          <p>{pound}</p>
        </section>
        <section className="currency-box">
          <label>CANADIAN DOLLAR</label>
          <p>{CAD}</p>
        </section>
        <section className="currency-box">
          <label>EGYPTIAN POUND</label>
          <p>{EGP}</p>
        </section>
      </figure>
    </main>
  )
}

export default App
