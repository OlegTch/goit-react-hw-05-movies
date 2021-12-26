// import Navigation from './components/Navigation/Navigation';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import MoviesPage from './components/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage';
// import Cast from './components/Cast';
// import Reviews from './components/Reviews';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation></Navigation>
      </header>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId" exact>
          <MovieDetailsPage />
        </Route>

        {/* <Route path="/movies/:movieId/cast">
          <Cast />
        </Route>

        <Route path="/movies/:movieId/reviews">
          <Reviews />
        </Route> */}

        <Route>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
