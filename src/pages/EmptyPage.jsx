import Lottie from "lottie-react";
import emptyAnimation from "../assets/lottie/empty-animation.json";

export default function EmptyPage() {
  return (
    <div className="grid items-center justify-center h-[calc(100vh-100px)]">
      <div className="flex flex-col font-bold text-center items-center h-max">
        <Lottie animationData={emptyAnimation} className="h-40 md:h-96" />
        <h1 className="md:text-xl">The movie you searching is not found</h1>
      </div>
    </div>
  );
}
