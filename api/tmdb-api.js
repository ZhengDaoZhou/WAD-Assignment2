import fetch from 'node-fetch';

export const getUpcomingMovies = (args) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=${args}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
        throw error
    });
};

export const getTopRatedMovies = (args) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=${args}`
    ).then((response) => {
        if (!response.ok) {
        throw new Error(response.json().message);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
    });
};

export const getPopularMovies = (args) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${args}`
    ).then((response) => {
        if (!response.ok) {
        throw new Error(response.json().message);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
    });
};