/* eslint-disable react/prop-types */

export default function Card(props){
    // console.log(props.sortedArray)
    // console.log(props.countryCard)
    const country = props.sortedArray.find(country => country.name.common === props.countryCardName)
    console.log(country)

    return (
        <div className="country-card">
            <button className="back-card" onClick={props.toggleCardOpen}>
                <i className="fa-solid fa-arrow-left"></i>
                Back
            </button>
            <div className="flag-stats-card">
                <img src={country.flags.png} alt={props.alt} />
                <div className="country-stats-card">
                    <h2 className="country-name-card">{country.name.common}</h2>
                    <div className="stats-p-card">
                        <p className="native-name"><span>Native Name: </span>{country.name.nativeName[Object.keys(country.name.nativeName)[0]].official || 'No Native Name'}</p>
                        <p className="population"><span>Population: </span>{country.population || 'No Population'}</p>
                        <p className="region"><span>Region: </span>{country.region || 'No Region'}</p>
                        <p className="sub-region"><span>Sub Region: </span>{country.subregion || 'No Subregion'}</p>
                        <p className="capital"><span>Capital: </span>{country.capital || 'No Capital'}</p>
                        <p className="domain"><span>Top Level Domain: </span>{country.tld[0] || 'No Top Level Domain'}</p>
                        <p className="currency"><span>Currencies: </span>{
                        country.currencies && Object.keys(country.currencies).length > 0 ? 
                        country.currencies[Object.keys(country.currencies)[0]].name || country.currencies[Object.keys(country.currencies)[0]].symbol || 'No Currency' :
                        'No Currency'}</p>
                        <p className="languages"><span>Languages: </span>{
                        country.languages && Object.keys(country.languages).length > 0 ? 
                        country.languages[Object.keys(country.languages)[1]] || country.languages[Object.keys(country.languages)[0]] || 'No Languages' :
                        'No Languages'}</p>
                    </div>
                    {/* <div className="border-countries">
                        <span className="border-countries-span">Border Countries:</span>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}