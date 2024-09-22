import PropTypes from "prop-types";
import { IMAGE_URL_W300 } from "../../utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiImage } from "react-icons/fi";

export default function MovieCard({ movie }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/detail/${movie.id}`} className="card">
      {movie.poster_path ? (
        <div className={`rounded-lg w-max ${imageLoaded ? "" : "bg-gray-600 animate-pulse"}`}>
          <img
            src={IMAGE_URL_W300 + movie.poster_path}
            alt={movie.poster_path}
            loading="lazy"
            className={`rounded-lg object-cover h-[150px] 2xl:h-[300px] transition-all duration-300 ${imageLoaded ? "opacity-1 scale-100" : "opacity-0 scale-75"}`}
            onLoad={() => {
              setImageLoaded(true);
            }}
          />
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center rounded-lg bg-gray-600 backdrop-blur-sm bg-opacity-20 w-full`}>
          <FiImage size={50} />
          <p className="p-5">No Image</p>
        </div>
      )}
    </Link>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};
