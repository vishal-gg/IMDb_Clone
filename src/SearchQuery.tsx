import { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Movie, APIResponse } from "./interfaces";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const apiKey = import.meta.env.VITE_APP_API_KEY;

interface PropsType {
  inputSearch: string;
  inputFocused: boolean;
}

function SearchQuery({ inputSearch, inputFocused }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const searchIMDb = async () => {
      if (!inputSearch) {
        return;
      }

      const options = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/auto-complete",
        params: { q: `${inputSearch}` },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
      };

      try {
        setIsLoading(true);
        const { data } = await axios<APIResponse>(options);
        setIsLoading(false);
        setSearchResult(data.d);
      } catch (err: any) {
        console.warn(err);
        setIsLoading(false);
        setError(err.message);
      }
    };

    const debounceTimer = setTimeout(searchIMDb, 1000);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputSearch]);

  useEffect(() => {
    if (!inputSearch) {
      setSearchResult([]);
    }
  }, [inputSearch]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (!inputFocused) {
      timeout = setTimeout(() => {
        divRef.current?.classList.add("pointer-events-none");
      }, 200);
    } else {
      divRef.current?.classList.remove("pointer-events-none");
    }
    return () => clearTimeout(timeout);
  }, [inputFocused]);



  //Loading Animation while searching

  const containerVarient = {
    hidden: {},
    show: {},
  };


  const childrenVariants = useMemo(() => {
    return Math.random() < 0.5 ? {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      } : {
        hidden: { y: -5 },
        show: { y: 5 },
      };
  }, []);

  const childrenTransition = {
    duration: 0.4,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  };

  
  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0 }}
      animate={inputFocused ? { opacity: 1 } : { opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.15 }}
      className={`absolute left-0 right-0 top-[38px] w-full h-fit min-h-[50vh] flex flex-col justify-center items-center transition-opacity bg-neutral-900 z-30 rounded-sm`}
    >
      {searchResult.length > 0 && !isLoading ? (
        searchResult.map((info) => (
          <div
            onClick={() => {
              navigate(`/title/${info.id}`);
            }}
            className="flex gap-4 p-2 w-full border-b border-[#ffffff40] cursor-pointer hover:bg-neutral-800 transition-colors"
            key={info.id}
          >
            <img
              style={{ aspectRatio: "2/3" }}
              src={info.i?.imageUrl}
              className="w-12"
              loading="lazy"
            />
            <div className="">
              <p className="font-normal">{info.l}</p>
              <p className="font-thin text-[#ffffffc4] text-sm">{info.y}</p>
              <p className="font-thin text-[#ffffffc4] text-sm">{info.s}</p>
            </div>
          </div>
        ))
      ) : !error ? (
        <motion.div
          variants={containerVarient}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1 }}
          className="flex gap-2 p-3"
        >
          <motion.span
            variants={childrenVariants}
            transition={childrenTransition}
            className="h-3 w-3 rounded-full bg-white"
          ></motion.span>
          <motion.span
            variants={childrenVariants}
            transition={childrenTransition}
            className="h-3 w-3 rounded-full bg-white"
          ></motion.span>
          <motion.span
            variants={childrenVariants}
            transition={childrenTransition}
            className="h-3 w-3 rounded-full bg-white"
          ></motion.span>
        </motion.div>
      ) : (
        <pre className="text-red-500">{JSON.stringify(error, null, 2)}</pre>
      )}
    </motion.div>
  );
}

export default SearchQuery;
