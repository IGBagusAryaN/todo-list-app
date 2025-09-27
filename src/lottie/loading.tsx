import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const LoadingAssets = () => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/assets/loading.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Gagal load animasi:", err));
  }, []);
  return (
    <div className="w-24 h-24">
      <Lottie animationData={animationData} loop={true} size={5} />
    </div>
  );
};

export default LoadingAssets;
