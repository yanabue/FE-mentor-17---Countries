
export default function Filter(props){

    return (
        <div className="filter">
            <select name="filter" className="filter-select shadow" value={props.region} onChange={(e) => props.updateRegionValue(e.target.value)}>
                <option value="All">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="All">All</option>
            </select>
        </div>
    )
}