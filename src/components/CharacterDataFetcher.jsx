import React, { useEffect, useState } from 'react';

export default function CharacterDataFetcher({ children }) {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const fetchAllCharacters = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      const characters = data.results;
      const characterDataPromises = characters.map(async (character) => {
        const homeworldPromise = fetch(character.homeworld)
          .then((response) => response.json())
          .then((homeworldData) => homeworldData.name)
          .catch((error) => {
            console.error('Error fetching homeworld:', error);
            return '';
          });

        const filmPromises = character.films.map((film) =>
          fetch(film)
            .then((response) => response.json())
            .then((filmData) => filmData.title)
            .catch((error) => {
              console.error('Error fetching film:', error);
              return '';
            })
        );

        const homeworld = await homeworldPromise;
        const films = await Promise.all(filmPromises);

        return {
          ...character,
          homeworld,
          films,
        };
      });
      const characterData = await Promise.all(characterDataPromises);
      setCharacterData(characterData);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  return <>{children(characterData)}</>;
}
