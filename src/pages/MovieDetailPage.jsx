import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { Loading, Movies } from "../components";
import { IMAGE_URL_ORIGINAL, getMovieDetail, getMovieRecommendations, getMovieVideos } from "../utils";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [isHasRecommendation, setIsRecommendation] = useState(null);

  useEffect(() => {
    getMovieDetail(id).then(async ({ data }) => {
      setMovie(data);
    });

    getMovieVideos(id).then(async ({ data }) => {
      setVideos(data);
    });
  }, [id]);

  const isHasRecommendationHandler = (isHasRecommendation) => {
    setIsRecommendation(isHasRecommendation);
  };

  const fetchRecommendation = (page) => {
    return getMovieRecommendations(id, page ?? 1);
  };

  // return loading
  if (!movie || !videos) {
    return <Loading />;
  }

  const { title, overview, genres, release_date, status, vote_average } = movie;
  const video = videos.find((item) => item.type.toLowerCase() == "teaser");
  const embedUrl = `https://www.youtube.com/embed/${video?.key ?? ""}`;

  return (
    <div className="app bg-cover">
      <img
        className={`movie__detail-img blur-lg`}
        src={`${IMAGE_URL_ORIGINAL + movie.backdrop_path}`}
        alt=""
        onLoad={(e) => {
          e.target.classList.remove("blur-lg");
        }}
      />
      <section className="movie__detail-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <span className="order-2 grid items-center">
            <div className="overflow-hidden">
              <h1 className="md:text-5xl text-xl font-bold text-center lg:text-start my-5 h-max">{title}</h1>
              <p className="text-justify text-sm md:text-base">{overview}</p>
              <span className="grid lg:max-xl:grid-cols-1 max-md:grid-cols-1 grid-cols-2 items-center justify-between">
                <div className="movie__detail-genres">
                  {genres.map(({ id, name }) => (
                    <div key={id} className="movie__genre">
                      {name}
                    </div>
                  ))}
                </div>
                <span className="flex justify-between text-sm md:text-base">
                  <p className="text-start sm:text-end">
                    {status} in, {release_date}
                  </p>
                  <p>
                    {vote_average.toFixed(2)} <BsStarFill size={16} className="inline" />
                  </p>
                </span>
              </span>
              <span className={`${isHasRecommendation ? "" : "invisible"}`}>
                <h3 className="text-lg font-semibold">Recommendation</h3>
                <Movies fetchData={fetchRecommendation} isHasRecommendation={isHasRecommendationHandler} />
              </span>
              <Link to="/" className="bg-slate-800 rounded-sm font-medium py-1 px-3">
                Back to Home
              </Link>
            </div>
          </span>
          <span className="order-1 grid lg:order-2 h-80 md:h-auto items-stretch md:items-center">
            <div className="overflow-hidden">
              <iframe className="w-full h-full place-self-center md:h-auto md:aspect-[4/3] md:p-14 xl:p-24 rounded-lg overflow-hidden" src={video ? embedUrl : ""} wmode="transparent" />
            </div>
          </span>
        </div>
      </section>
    </div>
  );
}
