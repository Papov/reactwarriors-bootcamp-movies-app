import React from "react";
import PropTypes from "prop-types";
import { UISelect } from "../ui/UISelect";
import { observer, inject } from "mobx-react";

@inject(({ moviesStore }) => ({
  sort_by: moviesStore.filters.sort_by,
  onChangeFilters: moviesStore.onChangeFilters
}))
@observer
class SortBy extends React.Component {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    sort_by: PropTypes.string.isRequired
  };

  static defaultProps = {
    options: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc"
      }
    ]
  };

  render() {
    const { onChangeFilters, sort_by, options } = this.props;
    //console.log("sortBy");
    return (
      <UISelect
        label="Сортировать по:"
        id="sort_by"
        value={sort_by}
        onChange={onChangeFilters}
        name="sort_by"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </UISelect>
    );
  }
}

export { SortBy };
