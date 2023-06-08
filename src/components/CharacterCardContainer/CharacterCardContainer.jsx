import React, { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';

export default function CharacterCardContainer() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
        try {
          let allCharacters = [];
          let nextPage = 'https://swapi.dev/api/people/';
      
          while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            allCharacters = [...allCharacters, ...data.results];
            nextPage = data.next;
          }
      
          setCharacters(allCharacters);
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
      };

    fetchCharacters();
  }, []);

  return (
    <div className="CharacterCardContainer">
      {characters.map((character, index) => (
        <CharacterCard key={index} character={character} />
      ))}
    </div>
  );
}
