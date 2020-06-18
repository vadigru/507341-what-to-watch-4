import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const FilmData = {
  TITLE: `Joker`,
  GENRE: `Drama`,
  YEAR: 2019
};

const films = [
  {
    title: `Star Wars: Episode I - The Phantom Menace`,
    posterUrl: `https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg`
  },
  {
    title: `Star Wars: Episode II - Attack of the Clones`,
    posterUrl: `https://images-na.ssl-images-amazon.com/images/I/61zAkpvYLqL._AC_SY679_.jpg`
  },
  {
    title: `Star Wars: Episode III - Revenge of the Sith`,
    posterUrl: `https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg`
  },
  {
    title: `Star Wars: Episode IV: A New Hope`,
    posterUrl: `https://m.media-amazon.com/images/I/51c6S4kGFmL.jpg`
  },
];

it(`Should render Main component`, () => {
  const tree = renderer
    .create(
        <Main
          title={FilmData.TITLE}
          genre={FilmData.GENRE}
          year={FilmData.YEAR}
          movies={films}
          onMovieTitleClick={()=> {}}
        />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
