import Lottie from "lottie-react";
import animation404 from "../assets/lottie/error-404-animation.json";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="grid items-center justify-center h-screen">
      <div className="flex flex-col font-bold text-center items-center h-max">
        <Lottie animationData={animation404} className="h-40 md:h-96" />
        <h1 className="mt-10 mb-5 text-5xl md:text-7xl">404</h1>
        <h1 className="md:text-xl">The page you searching is not found</h1>
        <Link
          to="/"
          className="bg-blue-500 py-3 px-5 rounded-md mt-5 hover:bg-blue-700 transition-all duration-300 hover:shadow-[0_15px_100px_15px_rgba(59,130,249,0.3)]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
