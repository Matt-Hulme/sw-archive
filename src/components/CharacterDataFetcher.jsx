import React, { useEffect, useState } from 'react';

export default function CharacterDataFetcher({ children }) {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    const cachedCharacterData = localStorage.getItem('characterData');

    if (cachedCharacterData) {
      const parsedData = JSON.parse(cachedCharacterData);
      if (parsedData.length < 82) {
        fetchAllCharacters();
      } else {
        setCharacterData(parsedData);
      }
    } else {
      fetchAllCharacters();
    }
  }, []);

  const fetchAllCharacters = async () => {
    try {
      let allCharacters = [];
      let nextUrl = 'https://swapi.dev/api/people/';
      let id = 0;

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        const characters = data.results.map((character) => {
          if (id === 16) {
            id++;
            
          }

          const characterId = id++;
          
          return {
            ...character,
            id: characterId,
          };
        });
        allCharacters.push(...characters);
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
