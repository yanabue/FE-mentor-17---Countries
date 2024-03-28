/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Country from "./Country";
import { nanoid } from 'nanoid'

export default function Countries(){

    const [countriesArray, setCountriesArray] = useState([])

    useEffect(() => {
        fetchCountries()
    }, [])
    
    let sortedArray = []
    async function fetchCountries(){
        try {
            const response = await fetch('https://restcountries.com/v3.1/all')
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json()
            sortedArray = sortCountries(data)
        } catch (error){
            console.error('Error fetching data:', error.message);
        }
    }
    
    function sortCountries(data){
        sortedArray = [...data].sort((a, b) => {
            let nameA = a.name.common.toUpperCase();
            let nameB = b.name.common.toUpperCase();
            return nameA > nameB ? 1 : -1;
        })
        console.log(sortedArray)
        setCountriesArray(sortedArray)
    }

    function renderCountries(){
        return countriesArray.map(country => {
            return (
            <Country 
            key={nanoid()}
            flag={country.flags.png}
            alt={country.flags.alt}
            name={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital}
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