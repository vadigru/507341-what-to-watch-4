import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const FilmData = {
  TITLE: `Joker`,
  GENRE: `Drama`,
  YEAR: 2019
};

const films = [
  {
    title: `Movie Title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    genre: `Movie Genre`,
    release: 2020,
    director: `Director Name`,
    starring: [`Actor One`, `Actor Two`, `Actor Three`],
    time: `1h 00m`,
    rating: 10,
    votes: 1000,
    description: `Movie Description`
  }
];

const preventEvent = {
  preventDefault() {}
};

it(`Should movie card be pressed`, () => {

  const handleMovieCardClick = jest.fn(() => () => {});

  const main = mount(
      <Main
        title={FilmData.TITLE}
        genre={FilmData.GENRE}
        year={FilmData.YEAR}
        movies={films}
        onMovieCardClick={() => handleMovieCardClick}
      />
  );

  const movieImage = main.find(`div.small-movie-card__image`);
  const movieTitle = main.find(`h3.small-movie-card__title`);
  movieImage.props().onClick();
  movieTitle.props().onClick(preventEvent);
  expect(handleMovieCardClick).toHaveBeenCalledTimes(2);
});