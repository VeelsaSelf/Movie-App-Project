import { useEffect, useState } from "react";
import { IMAGE_URL_ORIGINAL, getLatestMovie } from "../../utils";

/* Swiper */
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";

import { useNavigate } from "react-router-dom";
import "swiper/modules";

export default function LatestMovieCard() {
  const [movies, setMovies] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getLatestMovie(true)
      .then(({ data }) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!movies) return null;

  return (
    <div>
      <Swiper
        className="my-5 hidden lg:block"
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id} className="relative rounded-lg overflow-hidden lg:aspect-video cursor-pointer bg-gradient-to-t from-gray-950 via-transparent" onClick={() => navigate(`/detail/${movie.id}`)}>
              <img
                src={IMAGE_URL_ORIGINAL + movie.backdrop_path}
                alt={movie.backdrop_path}
                className="h-max -z-10 lg:absolute object-cover blur-lg"
                loading="lazy"
                onLoad={(e) => {
                  e.target.classList.remove("blur-lg");
                }}
              />
              <div className="flex flex-col justify-end h-full p-5">
                <h3 className="font-bold text-xs lg:text-xl">{movie.title}</h3>
                <p className="font-thin line-clamp-1 xl:line-clamp-3">{movie.overview}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
