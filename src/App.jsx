import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Home />
        </motion.div>
      )}
    </>
  );
}

export default App;