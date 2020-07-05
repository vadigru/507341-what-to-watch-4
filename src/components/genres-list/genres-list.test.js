import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import GenresList from "./genres-list.jsx";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const.js";

const mockStore = configureStore([]);

const films = [
  {
    title: `Movie title`,
    posterUrl: `https://url.com/poster.jpg`,
    backgroundUrl: `https://url.com/poster/1.jpg`,
    previewUrl: `https://url.com/preview/video.mp4`,
    genre: `Movie Genre`,
    release: 2020,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    time: `1h 00m`,
    rating: 10,
    votes: 1000,
    description: `Movie description`,
    reviews: [
      {
        date: `June 25, 2020`,
        user: `John Doe`,
        comment: `Comment text.`,
        rating: 8.9
      },
    ]
  }
];

it(`Should render GenresList component`, () => {
  const store = mockStore({
    genre: ALL_GENRES,
    films,
    showedMovies: MOVIES_DEFAULT_AMOUNT
  });

  const onMovieCardClick = jest.fn();
  const showDefaultMovies = jest.fn();

  const tree = renderer
    .create(
        <Provider store={store}>
          <GenresList
            movies={films}
            activeTab={ALL_GENRES}
            onTabClick={onMovieCardClick}
            onGenreTabClick={showDefaultMovies}
          />
        </Provider>
    )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
