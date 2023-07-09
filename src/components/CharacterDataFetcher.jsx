import React, { useEffect, useState } from 'react';

export default function CharacterDataFetcher({ children }) {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    const cachedData = localStorage.getItem('characterData');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        setCharacterData(parsedData);
      } else {
        console.log("fetching character data");
        fetchAllCharacters();
      }
    } else {
      console.log("fetching character data");
      fetchAllCharacters();
    }
  }, []);
  
  

  const fetchAllCharacters = async () => {
    try {
      let allCharacters = [];
      let nextUrl = 'https://swapi.dev/api/people/';
  
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        const characters = data.results;
        allCharacters = [...allCharacters, ...characters];
        nextUrl = data.next;
      }
  
      setCharacterData(allCharacters);
      localStorage.setItem('characterData', JSON.stringify(allCharacters));

    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };
  
  return <>{children(characterData)}</>;
}
