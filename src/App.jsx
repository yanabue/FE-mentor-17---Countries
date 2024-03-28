import Countries from "./components/Countries"

export default function App() {

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
          {/* <Filter /> */}
        </section>
        <section className="countries">
          <Countries />
        </section>
      </main>
    </>
  )
}

