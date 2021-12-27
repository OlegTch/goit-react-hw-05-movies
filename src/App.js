import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';
import Loader from './components/Loader';
// import HomePage from './components/HomePage';
// import MoviesPage from './components/MoviesPage';
// import MovieDetailsPage from './components/MovieDetailsPage';

const HomePage = lazy(() =>
  import('./components/HomePage' /*webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import(
    './components/MoviesPage/MoviesPage.js' /*webpackChunkName: "MoviesPage" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage.js' /*webpackChunkName: "MovieDetailsPage" */
  ),
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation></Navigation>
      </header>
      <Suspense fallback={<Loader></Loader>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
