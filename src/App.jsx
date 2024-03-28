import Filter from './components/Filter'
import Countries from "./components/Countries"
import { useState } from 'react'

export default function App() {

  const [region, setRegion] = useState('')
  const [isFiltered, setIfFiltered] = useState(false)

  function updateRegionValue(newValue){
    if (newValue === 'All'){
      setIfFiltered(false)
      setRegion(newValue)
    } else {
      setRegion(newValue)
      setIfFiltered(true) 
    }
  }

// console.log(region)
// console.log(isFiltered)

  return (
    <>
      <header className="header">
        <nav className="nav-bar">
          <h1 className="main-title">Where in the world?</h1>
          <button className="theme-button">
          <i className="fa-regular fa-moon" alt="moon theme icon"></i>
            Dark Mode</button>
        </nav>
      </header>
      <main className="main">
        <section className="search-filter-section">
          {/* <Input /> */}
          <Filter updateRegionValue={updateRegionValue} region={region} />
        </section>
        <section className="countries">
          <Countries isFiltered={isFiltered} region={region}/>
        </section>
      </main>
    </>
  )
}

