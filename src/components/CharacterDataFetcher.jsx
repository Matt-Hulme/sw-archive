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
        fetchAllCharacters();
      }
    } else {

      fetchAllCharacters();
    }
  }, []);

  const fetchAllCharacters = async () => {
    try {
      let allCharacters = [];
      let nextUrl = 'https://swapi.dev/api/people/';
      let id = '0';

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        const characters = data.results.map((character) => {
          const characterId = id === '17' ? '18' : id;
          id = (parseInt(id) + 1).toString();
          console.log('character.id', characterId);
          return {
            ...character,
            ['id']: characterId,
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
