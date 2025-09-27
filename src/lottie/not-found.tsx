import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const NotFoundAssets = () => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/assets/not-found.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Gagal load animasi:", err));
  }, []);
  return (
    <div className="w-48 h-48">
      <Lottie animationData={animationData} loop={true} size={5} />
    </div>
  );
};

export default NotFoundAssets;
