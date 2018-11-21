import React, { Component, Fragment } from "react";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class Genres extends Component {
  state = {
    genresList: []
  };
  // ПОЛУЧАЕМ СПИСОК ВСЕХ ЖАНРОВ
  componentDidMount() {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => response.json())
      .then(data => {
        this.setState({
          genresList: data.genres
        });
      });
  }
  // СБРАСЫВАЕМ ЖАРНРЫ
  showAllGenres = () => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
  };
  // ФИЛЬТРУЕМ ПО ВЫБРАНЫМ ЖАНРАМ
  checkedGenges = event => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...this.props.with_genres, event.target.value]
          : [
              ...this.props.with_genres.filter(
                genre => genre !== event.target.value
              )
            ]
      }
    });
  };

  render() {
    const { genresList } = this.state;
    const { with_genres } = this.props;
    return (
      <Fragment>
        {/*СБРОСИТЬ ВЫБРАННЫЕ ЖАНРЫ*/}
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.showAllGenres}
          style={{ marginBottom: "15px" }}
        >
          Все жанры
        </button>
        {/*СПИСОК ЧЕКСБОКСОВ ЖАНРЫ*/}
        {genresList.map(genre => (
          <div className="form-check" key={`genre${genre.id}`}>
            <input
              type="checkbox"
              className="form-check-input"
              value={genre.id}
              id={`id${genre.id}`}
              onChange={this.checkedGenges}
              checked={with_genres.includes(String(genre.id))}
            />
            <label htmlFor={`id${genre.id}`}>{genre.name}</label>
          </div>
        ))}
      </Fragment>
    );
  }
}
