

export default function Search(props){
    return (
        <div className="search">
            <input type="text" className="search-field shadow" placeholder="Search for a country..." 
            value={props.searchInput}
            onChange={e => props.updateSearch(e.target.value)}/>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
    )
}