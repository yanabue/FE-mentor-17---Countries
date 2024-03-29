/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState, useRef } from "react";
import Country from "./Country";
import { nanoid } from 'nanoid';

export default function Countries(props){

    const [countriesArray, setCountriesArray] = useState([])
    let sortedArray = useRef([])

    useEffect(() => {
        fetchCountries()
    }, [])
    
    //Runs on first render
    async function fetchCountries(){
        try {
            const response = await fetch('https://restcountries.com/v3.1/all')
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json()
            sortCountries(data)
        } catch (error){
            console.error('Error fetching data:', error.message);
        }
    }
    
    // Runs on first render too + sorts the countries array alphabetically + sets the countries array as sortedArray.current
    function sortCountries(data){
        sortedArray.current = [...data].sort((a, b) => {
            let nameA = a.name.common.toUpperCase();
            let nameB = b.name.common.toUpperCase();
            return nameA > nameB ? 1 : -1;
        })
        props.handleRefUpdate(sortedArray.current);
        setCountriesArray(sortedArray.current)
    }

    // Whenever user changes region in dropdown menu - the countriesArray is set to the corresponding array, that is based on the sortedArray variable
    useEffect(() => {
        if (props.isFiltered){
            setCountriesArray(sortedArray.current.filter(country => country.region === props.region))
        } else {
            setCountriesArray(sortedArray.current)
        }
    }, [props.region, props.isFiltered])

    useEffect(() => {
        if (props.isSearched){
            let newRegex = new RegExp(`${props.searchInput.toLowerCase()}`)
            setCountriesArray(sortedArray.current.filter(country => newRegex.test(country.name.common.toLowerCase())))
        } else {
            setCountriesArray(sortedArray.current)
        }
    }, [props.searchInput, props.isSearched])
    
    function putCommas(population){
        let numArr = population.toString().split('');

        let arrLength = numArr.length; //7
        let i = -3;
        while (arrLength >= 3){
            numArr.splice(i, 0, ",")
            i = i - 4;
            arrLength = arrLength - 4;
        }
        return numArr.join('')
    }

    // Based on the countriesArray - all countries are mapped over and created an element for
    function renderCountries(){
        return countriesArray.map(country => {
            return (
              <Country 
                key={nanoid()}
                flag={country.flags.png}
                alt={country.flags.alt}
                name={country.name.common}
                population={country.population ? putCommas(country.population) : 'No Population'}
                region={country.region || 'No Region'}
                capital={country.capital || 'No Capital'}
                toggleCardOpen={props.toggleCardOpen}
                setCountry={props.setCountry}
            />
            )
        })
    }

    return (
        <>
            {renderCountries()}
        </>
    )
}