/* eslint-disable react-hooks/exhaustive-deps */
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovie } from "../utils";
import MovieCard from "../components/movies/MovieCard";
import { Loading } from "../components";
import EmptyPage from "./EmptyPage";
import { Waypoint } from "react-waypoint";

export default function SearchPage() {
  const [useQuery] = useSearchParams();
  const [debouncedQuery] = useDebounce(useQuery, 500);
  const [movies, setMovies] = useState(null);
  const [pages, setPage] = useState({
    total_pages: null,
    page: 1,
  });

  useEffect(() => {
    console.log("init");
    const query = debouncedQuery.get("query");

    // fetch by pages, if null value assigned to 1
    getSearchMovie(query, pages.page ?? 1)
      .then(({ data, total_pages }) => {
        // set total pages after init fetch data
        if (!pages.total_pages)
          setPage((prev) => {
            return {
              ...prev,
              total_pages: total_pages,
            };
          });

        // set movies state data
        setMovies((prev) => {
          if (!prev) {
            return data;
          }
          return [...prev, ...data];
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setMovies(null);
    };
  }, [debouncedQuery]);

  useEffect(() => {
    const query = debouncedQuery.get("query");

    if (pages.page > 1) {
      console.log("new page");
      // fetch by pages, if null value assigned to 1
      getSearchMovie(query, pages.page ?? 1)
        .then(({ data, total_pages }) => {
          // set total pages after init fetch data
          if (!pages.total_pages)
            setPage((prev) => {
              return {
                ...prev,
                total_pages: total_pages,
              };
            });

          // set movies state data
          setMovies((prev) => {
            if (!prev) {
              return data;
            }
            return [...prev, ...data];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pages.page]);

  if (!movies) return <Loading />;

  if (movies.length == 0) return <EmptyPage />;

  return (
    <section className="m-5 grid 2xl:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-3 gap-5 md:gap-y-10">
      {movies.map((movie) => {
        return <MovieCard movie={movie} key={movie.id} />;
      })}
      <Waypoint
        onEnter={() => {
          // do the increment of the page if page < total pages
          if (pages.page < pages.total_pages)
            setPage((prev) => {
              return {
                page: prev.page++,
                ...prev,
              };
            });
        }}
      />
    </section>
  );
}
