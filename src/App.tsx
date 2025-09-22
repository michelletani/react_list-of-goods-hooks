import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  None = 'none',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

function getSortedList(
  list: string[],
  sortBy: SortType,
  isReverse: boolean,
): string[] {
  const sortedList = [...list];

  sortedList.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.Alphabetically:
        return good1.localeCompare(good2);

      case SortType.Length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReverse) {
    sortedList.reverse();
  }

  return sortedList;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState<boolean>(false);

  const preparedList = getSortedList(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortField !== SortType.Alphabetically ? 'is-light' : ''
          }`}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortField !== SortType.Length ? 'is-light' : ''
          }`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${reverse !== true ? 'is-light' : ''} is-warning`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedList.map(el => (
          <li data-cy="Good" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
