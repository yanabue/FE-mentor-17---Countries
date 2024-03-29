import Filter from './components/Filter'
import Countries from "./components/Countries"
import Search from './components/Search'
import Card from './components/Card'
import { useState, useRef } from 'react'

export default function App() {

  const [region, setRegion] = useState('')
  const [isFiltered, setIfFiltered] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [isSearched, setIsSearched] = useState(false)

  function updateRegionValue(regionSelection){
    if (regionSelection === 'All'){
      setIfFiltered(false)
      setRegion(regionSelection)
    } else {
      setRegion(regionSelection)
      setIfFiltered(true) 
    }
  }

  function updateSearch(searchText){
    if (searchText === ''){
      setIsSearched(false)

    } else {
      setIsSearched(true)
      setSearchInput(searchText)

    }
  }

  const [isCardOpen, setIsCardOpen] = useState(false)
  const [countryCardName, setCountryCardName] = useState(null)

  function toggleCardOpen(){
      setIsCardOpen(prevCardOpen => !prevCardOpen)
    }

  function setCountry(countryName){
    setCountryCardName(countryName)
  }
  
  const sortedArray = useRef([])
  function handleRefUpdate(ref){
    sortedArray.current = ref
  }

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
      {!isCardOpen ? 
      <main className="main">
        <section className="search-filter-section">
          <Search updateSearch={updateSearch} serarchInput={searchInput} />
          <Filter updateRegionValue={updateRegionValue} region={region} />
        </section>
        <section className="countries">
          <Countries isFiltered={isFiltered} region={region}
            isSearched={isSearched} searchInput={searchInput}
            toggleCardOpen={toggleCardOpen}
            setCountry={setCountry}
            handleRefUpdate={handleRefUpdate}
          />
        </section>
      </main> 
      : <Card toggleCardOpen={toggleCardOpen}
        countryCardName={countryCardName}
        sortedArray={sortedArray.current}
      />}
    </>
  )
}

