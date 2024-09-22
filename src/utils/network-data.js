export const BASE_URL = "https://api.themoviedb.org/3";
export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjFmMjZlNDc2MjZhOTg0NDg1YTVjNDNjMjQ2YjhlYyIsIm5iZiI6MTcyNjcxODA0MC42MTQyNjQsInN1YiI6IjY2ZGY5YWUxNmFiM2UzNTI1OGYxYWYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CV3E15BTTIZxAZ7zGIlfNpKVXhhBz3pTzy1kjxwbVr0";

export async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
}

export async function getNowPlaying(page) {
  const response = await fetchWithToken(`${BASE_URL}/movie/now_playing?page=${page}`);
  const responseJson = await response.json();

  return { error: false, data: responseJson.results, total_pages: responseJson.total_pages };
}

export async function getPopular(page) {
  const response = await fetchWithToken(`${BASE_URL}/movie/popular?page=${page}`);
  const responseJson = await response.json();

  return { error: false, data: responseJson.results, total_pages: responseJson.total_pages };
}

export async function getTopTated(page) {
  const response = await fetchWithToken(`${BASE_URL}/movie/top_rated?page=${page}`);
  const responseJson = await response.json();

  return { error: false, data: responseJson.results, total_pages: responseJson.total_pages };
}

export async function getUpcoming(page) {
  const response = await fetchWithToken(`${BASE_URL}/movie/upcoming?page=${page}`);
  const responseJson = await response.json();

  return { error: false, data: responseJson.results, total_pages: responseJson.total_pages };
}

export async function getMovieDetail(id) {
  const response = await fetchWithToken(`${BASE_URL}/movie/${id}`);
  const responseJson = await response.json();

  return { error: false, data: responseJson };
}

export async function getMovieRecommendations(id, page) {
  const response = await fetchWithToken(`${BASE_URL}/movie/${id}/recommendations?page=${page}`);
  const responseJson = await response.json();

  return { error: false, data: responseJson.results, total_pages: responseJson.total_pages };
}

export async function getMovieVideos(id) {
  const response = await fetchWithToken(`${BASE_URL}/movie/${id}/videos`);
  const responseJson = await response.json();

  return { error: false, data: responseJson.results };
}

export async function getSearchMovie(query, page) {
  const response = await fetchWithToken(`${BASE_URL}/search/movie?query=${query}&page=${page}`);
  const responseJson = await response.json();

  return { error: false, data: responseJson.results, total_pages: responseJson.total_pages };
}

/**
 * Fetches the latest trending movie data based on a time window.
 *
 * @async
 * @function
 * @param {boolean} time_window - A boolean value indicating whether to fetch data for the 'day' or 'week' time window.
 * @returns {Promise<{error: boolean, data: any}>} A promise that resolves to an object containing fetched data.
 * @throws {Error} Throws an error if the fetch request fails.
 *
 * @example
 * // Fetch trending movies for the 'day' time window
 * const trendingMovies = await getLatestMovie(true);
 *
 * // Fetch trending movies for the 'week' time window
 * const trendingMovies = await getLatestMovie(false);
 */
export async function getLatestMovie(time_window) {
  const response = await fetchWithToken(`${BASE_URL}/trending/movie/${time_window ? "day" : "week"}`);
  const responseJson = await response.json();

  return { error: false, data: responseJson.results };
}
