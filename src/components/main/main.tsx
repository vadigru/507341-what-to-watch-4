import * as React from "react";
import {connect} from "react-redux";
import {AxiosPromise} from "axios";

import Header from "../header/header";
import Footer from "../footer/footer";
import MovieError from "../../components/movie-error/movie-error";
import MoviesList from "../movies-list/movies-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import Tabs from "../tabs/tabs";

import {Operation} from "../../reducer/data/data";
import {
  getMovies,
  getPromo,
  getMoviesByGenre
} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/state/state";
import {getGenre, getShowedMovies} from "../../reducer/state/selectors";

import {Movie} from "../../prop-types/types";
import {getMaxGenresCount, getGenresList} from "../../utils/common";
import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT, AppRoute} from "../../const";
import history from "../../history";

interface Props {
  id: number;
  promo: Movie;
  movies: Movie[];
  showedMovies: number;
  showMoreMovies: () => void;
  showDefaultMovies: () => void;
  genre: string;
  changeGenre: (genre: string) => void;
  onMovieCardClick: (id: number) => void;
  filteredMovies: Movie[];
  isDataLoadingError: boolean;
  addMovieToFavorite: (id: number) => AxiosPromise;
  removeMovieFromFavorite: (id: number) => AxiosPromise;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movies,
    showedMovies,
    showMoreMovies,
    filteredMovies,
    genre,
    promo,
    onMovieCardClick,
    changeGenre,
    showDefaultMovies,
    addMovieToFavorite,
    removeMovieFromFavorite,
    isDataLoadingError
  } = props;

  const genresList = getMaxGenresCount(getGenresList(movies));
  const isThereMoreMovies = filteredMovies.length > MOVIES_DEFAULT_AMOUNT && genre !== ALL_GENRES ||
        showedMovies < movies.length && genre === ALL_GENRES;

  return (
    isDataLoadingError ? <MovieError /> :
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={promo.backgroundUrl} alt={promo.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header className={`movie-card__head`} />

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={promo.posterUrl} alt={promo.title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{promo.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{promo.genre}</span>
                  <span className="movie-card__year">{promo.release}</span>
                </p>

                <div className="movie-card__buttons">
                  <button
                    className="btn btn--play movie-card__button"
                    type="button"
                    onClick={() =>
                      history.push(
                          `${AppRoute.MOVIE_PAGE}/${promo.id}${AppRoute.PLAYER}`
                      )
                    }
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s">
                      </use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={() => {
                      if (promo.isFavorite) {
                        removeMovieFromFavorite(promo.id);
                      } else {
                        addMovieToFavorite(promo.id);
                      }
                    }}
                  >
                    {promo.isFavorite ? (
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                    )}
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <React.Fragment>
              <Tabs
                className={`catalog__genres-`}
                tabNames={genresList}
                activeTab={genre}
                onTabClick={changeGenre}
                onGenreTabClick={showDefaultMovies}
              />

              <MoviesList
                movies={filteredMovies}
                onMovieCardClick={onMovieCardClick}
              />
            </React.Fragment>

            {isThereMoreMovies
              ? <ShowMoreButton onShowMoreButtonClick={showMoreMovies}/>
              : null}
          </section>

          <Footer />

        </div>
      </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  promo: getPromo(state),
  genre: getGenre(state),
  movies: getMovies(state),
  showedMovies: getShowedMovies(state),
  filteredMovies: getMoviesByGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  showMoreMovies() {
    dispatch(ActionCreator.showMoreMovies());
  },
  showDefaultMovies() {
    dispatch(ActionCreator.showDefaultMovies());
  },
  addMovieToFavorite(id) {
    dispatch(Operation.addMovieToFavorite(id));
  },
  removeMovieFromFavorite(id) {
    dispatch(Operation.removeMovieFromFavorite(id));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
