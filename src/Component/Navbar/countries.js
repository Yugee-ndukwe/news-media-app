// CountryNav.js
import React from 'react';
import { Link } from 'react-router-dom';

const countries = ['us', 'gb', 'ca', 'au', 'ng', 'ch', 'mx', 'ae', 'ru', 'it'];

export function CountryNav() {
  return (
    <nav>
      <ul>
        {countries.map(country => (
          <li key={country}>
            <Link to={`/country/${country}`}>{country.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
