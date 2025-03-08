import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import SplashScreenComponent from "@/app/screens/splashScreen";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      router.replace("/screens/startScreen");
    }
  }, [isLoading]);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return null;
}
