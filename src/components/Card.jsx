/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

export default function Card(props){
    console.log(props.countryCardName)
    let country = props.sortedArray.find(country => country.name.common === props.countryCardName)
    console.log(country)

    function renderBorders(){
        
        let borderCountriesInitial = country.borders;
        let borderCountries = props.sortedArray.filter(country => borderCountriesInitial.includes(country.cca3))
        return borderCountries.map(borderCountry => {
        return <button 
        key={nanoid()}
        className="border-button shadow"
        onClick={() => props.setCountry(borderCountry.name.common)}
        >
            {borderCountry.name.common}
        </button>
    })
    }

    return (
        <div className="country-card">
            <button className="back-card shadow" onClick={props.toggleCardOpen}>
                <i className="fa-solid fa-arrow-left"></i>
                Back
            </button>
            <div className="flag-stats-card">
                <img src={country.flags.svg} alt={props.alt} />
                <div className="country-stats-card">
                    <h2 className="country-name-card">{country.name.common}</h2>
                    <div className="stats-p-card">
                        <div className="main-stats">
                            <p className="native-name"><span>Native Name: </span>
                            {country.name.nativeName && Object.keys(country.name.nativeName).length > 1 ?
                            country.name.nativeName[Object.keys(country.name.nativeName)[1]].official :
                            country.name.nativeName && country.name.nativeName[Object.keys(country.name.nativeName)[0]].official ?
                            country.name.nativeName[Object.keys(country.name.nativeName)[0]].official :
                            country.name.official 
                            || 'No Native Name'}
                            </p>
                            <p className="population"><span>Population: </span>{props.putCommas(country.population) || 'No Population'}</p>
                            <p className="region"><span>Region: </span>{country.region || 'No Region'}</p>
                            <p className="sub-region"><span>Sub Region: </span>{country.subregion || 'No Subregion'}</p>
                            <p className="capital"><span>Capital: </span>{country.capital || 'No Capital'}</p>
                        </div>
                        <div className="sub-stats">
                            <p className="domain"><span>Top Level Domain: </span>{country.tld && country.tld[0] || 'No Top Level Domain'}</p>
                            <p className="currency"><span>Currencies: </span>{
                            country.currencies && Object.keys(country.currencies).length > 0 ? 
                            country.currencies[Object.keys(country.currencies)[0]].name || country.currencies[Object.keys(country.currencies)[0]].symbol || 'No Currency' :
                            'No Currency'}</p>
                            <p className="languages"><span>Languages: </span>{
                            country.languages && Object.keys(country.languages).length > 0 ? 
                            country.languages[Object.keys(country.languages)[1]] || country.languages[Object.keys(country.languages)[0]] || 'No Languages' :
                            'No Languages'}</p>
                        </div>
                    </div>
                    <div className="border-countries">
                        <span className="border-countries-span">Border Countries:</span>
                        <div className="border-countries-button">
                            {country.borders && renderBorders() || 'No Bordering Countries'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}