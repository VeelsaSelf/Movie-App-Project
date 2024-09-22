import Lottie from "lottie-react";
import animationData from "../../assets/lottie/loading-animation.json";

export default function loading() {
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <Lottie animationData={animationData} className="h-44 md:h-96" />
    </div>
  );
}
