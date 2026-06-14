import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>
      {!isLoading && <Home />}
    </>
  );
}

export default App;