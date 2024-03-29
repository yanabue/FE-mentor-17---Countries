

export default function Search(props){
    return (
        <div className="search">
            {/* <i class="fa-solid fa-magnifying-glass"></i> */}
            <input type="text" className="seach-field" placeholder="Search for a country..." 
            value={props.searchInput}
            onChange={e => props.updateSearch(e.target.value)}/>
        </div>
    )
}