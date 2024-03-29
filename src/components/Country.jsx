/* eslint-disable react/prop-types */

export default function Country(props){

    function handleClick(){
        props.toggleCardOpen();
        props.setCountry(props.name);
    }

    return (
        <button className="country" onClick={handleClick}>
            <img src={props.flag} alt={props.alt} className="flag-img" />
            <div className="country-data">
                <h2 className="country-name">{props.name}</h2>
                <div className="country-stats">
                    <p className="population"><span className="title-p">Population:</span> {props.population}</p>
                    <p className="region"><span className="title-p">Region:</span> {props.region}</p>
                    <p className="capital"><span className="title-p">Capital:</span> {props.capital}</p>
                </div>
            </div>
        </button>
    )
}