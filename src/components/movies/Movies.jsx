/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Waypoint } from "react-waypoint";
import PropTypes from "prop-types";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Movies({ title, fetchData, isHasRecommendation }) {
  const [movies, setMovies] = useState([]);
  const [pages, setPage] = useState({
    total_pages: null,
    page: 1,
  });

  const cardList = useRef(null);

  useEffect(() => {
    // fetch by pages, if null value assigned to 1
    fetchData(pages.page ?? 1).then(({ data, total_pages }) => {
      // set total pages after init fetch data
      if (!pages.total_pages)
        setPage((prev) => {
          return {
            ...prev,
            total_pages: total_pages,
          };
        });

      // set movies state data
      setMovies((prev) => [...prev, ...data]);
      // returning a boolean value into parent
      if (isHasRecommendation != null) isHasRecommendation(data.length > 0);
    });
  }, [pages.page]);

  const scrollLeft = () => {
    if (cardList.current) {
      cardList.current.scrollLeft -= 500;
    }
  };

  const scrollRight = () => {
    if (cardList.current) {
      cardList.current.scrollLeft += 500;
    }
  };

  // return nothing when theres no movies
  if (movies.length == 0) return null;

  return (
    <>
      <h1 className="font-bold text-xs md:text-3xl">{title}</h1>
      <div className="card__card-list scrollbar__hidden" ref={cardList}>
        <MdChevronLeft className="absolute xl:block hidden left-5 z-50 bg-gray-900 backdrop-blur-sm bg-opacity-50 rounded-full cursor-pointer hover:text-slate-400" size={50} onClick={scrollLeft} />
        {movies.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })}
        <Waypoint
          horizontal={true}
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
        <MdChevronRight className="absolute xl:block hidden right-5 z-50 bg-gray-900 backdrop-blur-sm bg-opacity-50 rounded-full cursor-pointer hover:text-slate-400" size={50} onClick={scrollRight} />
      </div>
    </>
  );
}

Movies.propTypes = {
  title: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  isHasRecommendation: PropTypes.func,
};
