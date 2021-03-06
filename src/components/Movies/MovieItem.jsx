import React from "react";
import PropTypes from "prop-types";
import FavoriteIcon from "./FavoriteIcon";
import WatchlistIcon from "./WatchlistIcon";

const noImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png";

export default class MovieItem extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;

    const image_available = !!(item.backdrop_path || item.poster_path);

    return (
      <div className="card">
        <img
          className="card-img-top card-img--height"
          src={
            image_available
              ? `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
                  item.poster_path}`
              : noImageUrl
          }
          alt="poster"
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="card-img d-flex justify-content-end">
            <FavoriteIcon movieId={item.id} />
            <WatchlistIcon movieId={item.id} />
          </div>
        </div>
      </div>
    );
  }
}
