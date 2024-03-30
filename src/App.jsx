import Filter from './components/Filter'
import Countries from "./components/Countries"
import Search from './components/Search'
import Card from './components/Card'
import { useState, useRef, useEffect } from 'react'

export default function App() {

  // For filter Component
  const [region, setRegion] = useState('')
  const [isFiltered, setIfFiltered] = useState(false)

  // For search Component
  const [searchInput, setSearchInput] = useState('')
  const [isSearched, setIsSearched] = useState(false)

  const [darkTheme, setDarkTheme] = useState(() => {
    return localStorage.getItem('darkTheme') ? JSON.parse(localStorage.getItem('darkTheme')) : false;
  })

  function toggleDarkTheme(){
    setDarkTheme(dt => !dt)
  }

  // Changes state of Region filter according to the region value chosen in Filter Component
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

  // For Card Component
  const [isCardOpen, setIsCardOpen] = useState(() => {
    return JSON.parse(localStorage.getItem('isCardOpen'))
  })
  const [countryCardName, setCountryCardName] = useState(() => {
    return localStorage.getItem('countryName') ? JSON.parse(localStorage.getItem('countryName')) : null
  })

  // For click on country button / back button
  function toggleCardOpen(){
      setIsCardOpen(prevCardOpen => !prevCardOpen)
  }

  // Sets the country name by the user clicking a country button
  function setCountry(countryName){
    setCountryCardName(countryName)
  }
  
  // Initialization of ref and function to update it by the Countries Component
  const sortedArray = useRef(localStorage.getItem('sortedArray') ? JSON.parse(localStorage.getItem('sortedArray')) : [])

  function handleRefUpdate(ref){
    sortedArray.current = ref
  }

  // Function to add commas to population number rendered 
  function putCommas(population){
    let numArr = population.toString().split('');
    let arrLength = numArr.length;
    let i = -3;
    while (arrLength >= 3){
        numArr.splice(i, 0, ",")
        i = i - 4;
        arrLength = arrLength - 4;
    }
    return numArr.join('')
}

  // Function of small arrow button
  function scrollToTop(){
    window.scrollTo(0,0);
  }

  useEffect(() => {
    localStorage.setItem('countryName', JSON.stringify(countryCardName))
    localStorage.setItem('isCardOpen', JSON.stringify(isCardOpen))
    localStorage.setItem('sortedArray', JSON.stringify(sortedArray.current))
    localStorage.setItem('darkTheme', JSON.stringify(darkTheme))
  }, [isCardOpen, countryCardName, sortedArray, darkTheme])


  function handleRandomClick(){
    setCountry(sortedArray.current[Math.floor(Math.random() * 250)].name.common)
    toggleCardOpen()
  }

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <header className="header">
        <nav className="nav-bar shadow">
          <h1 className="main-title">Where in the world?</h1>
          <button className="theme-button shadow" onClick={toggleDarkTheme}>
            {!darkTheme ?
            <>
              <i className="fa-regular fa-moon" alt="moon dark theme icon"></i> 
              Dark Theme 
            </> :
            <>
              <i className='fa-regular fa-sun' alt="sun light theme icon"></i>
              Light Theme
            </>
            }
              </button>
        </nav>
      </header>
      {!isCardOpen ? 
      <main className="main">
        <section className="search-filter-section">
          <Search updateSearch={updateSearch} serarchInput={searchInput} />
          <button className='random-button shadow' onClick={handleRandomClick}>Random Country</button>
          <Filter updateRegionValue={updateRegionValue} region={region} />
        </section>
        <section className="countries">
          <Countries
            isFiltered={isFiltered} region={region}
            isSearched={isSearched} searchInput={searchInput}
            toggleCardOpen={toggleCardOpen}
            setCountry={setCountry}
            handleRefUpdate={handleRefUpdate}
            putCommas={putCommas}
          />
        </section>
      </main> 
      : <Card 
        isCardOpen={isCardOpen}
        toggleCardOpen={toggleCardOpen}
        setCountry={setCountry}
        countryCardName={countryCardName}
        sortedArray={sortedArray.current}
        putCommas={putCommas}
      />}
      <button className='to-top-button shadow' onClick={scrollToTop}>
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </div>
  )
}

