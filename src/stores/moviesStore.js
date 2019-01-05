import { observable, action, reaction, flow, values } from "mobx";
import { CallApi } from "../api/api";

class MoviesStore {
  @observable
  filters = {
    sort_by: "popularity.desc",
    primary_release_year: "",
    with_genres: []
  };

  @observable
  movieData = {};

  @observable
  movies = [];

  @observable
  isLoading = false;

  @observable
  genresList = [];

  @observable
  page = 1;

  @observable
  total_pages = "";

  getMovies = flow(function*() {
    moviesStore.isLoading = true;
    try {
      const {
        sort_by,
        primary_release_year,
        with_genres
      } = moviesStore.filters;
      let queryParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: this.page,
        primary_release_year: primary_release_year
      };
      if (with_genres.length > 0) {
        queryParams.with_genres = with_genres.join(",");
      }
      const discover = yield CallApi.get("/discover/movie", {
        params: queryParams
      });
      moviesStore.movies.replace(discover.results);
      moviesStore.total_pages = discover.total_pages;
      moviesStore.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  });

  @action
  onChangeFilters = event => {
    const { name, value } = event.target;
    this.filters[name] = value;
  };

  @action
  getTotalPages = total_pages => {
    this.total_pages = total_pages;
  };

  @action
  onReset = () => {
    this.filters.sort_by = "popularity.desc";
    this.filters.primary_release_year = "";
    this.filters.with_genres = [];
    this.page = 1;
  };

  @action
  onChangePage = page => {
    this.page = page;
  };

  @action
  showAllGenres = () => {
    this.filters.with_genres = [];
  };

  @action
  genresDidMount = async () => {
    const data = await CallApi.get("/genre/movie/list", {
      params: {
        language: "ru-RU"
      }
    });
    this.genresList = data.genres;
  };

  @action
  checkedGenges = event => {
    const { with_genres } = this.filters;
    const value = event.target.checked
      ? [...with_genres, event.target.value]
      : with_genres.filter(genre => genre !== event.target.value);
    this.filters.with_genres = value;
  };
}

export const moviesStore = new MoviesStore();

reaction(
  () => values(moviesStore.filters),
  () => {
    moviesStore.page = 1;
    moviesStore.getMovies();
  }
);

reaction(
  () => moviesStore.page,
  () => {
    moviesStore.getMovies();
  }
);