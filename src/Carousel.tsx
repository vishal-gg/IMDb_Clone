import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";

interface resAPI {
  image: string;
  poster: string;
  title: string;
}

function Carousel() {
  const [count, setCount] = useState(0);
  const [ref, { width }] = useMeasure();
  const [shouldRunInterval, setShouldRunInterval] = useState(true);

  //get previous count
  const [tuple, setTuple] = useState([null, count]);

  if (count !== tuple[1]) {
    setTuple([tuple[1], count]);
  }

  const prev = tuple[0];

  const direction = prev !== null && count > prev ? 1 : -1;

  const { data } = useQuery({
    queryKey: ["carouselItems"],
    queryFn: async () => {
      const { data } = await axios({
        method: "GET",
        url: "custom_api/carousel.json",
      });
      return data as resAPI[];
    },
  });

  interface variantsType {
    direction: number;
    width: number;
  }

  const Varients = {
    hidden: ({ direction, width }: variantsType) => ({ x: direction * width }),
    visible: { x: 0 },
    exit: ({ direction, width }: variantsType) => ({ x: direction * -width }),
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (shouldRunInterval) {
      interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 7000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [shouldRunInterval]);

  return (
    <main>
      <div className="flex gap-4 px-8 py-2 bg-black text-white overflow-hidden selection:bg-none max-w-[1500px] mx-auto">
        <section
          ref={ref}
          style={{ aspectRatio: "16/10.2" }}
          className="min-w-[66.6666%] max-[992px]:basis-full bg-black relative overflow-hidden"
        >
          <AnimatePresence custom={{ direction, width }} initial={false}>
            <motion.div
              key={count}
              variants={Varients}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25, type: "tween" }}
              custom={{ direction, width }}
              className="h-full w-full absolute"
            >
              <div style={{ aspectRatio: "16/9" }} className="w-full relative">
                <img
                  className="w-full h-full absolute object-cover"
                  src={data && data[Math.abs(count) % data.length].image}
                />
                <button
                  className="hover:text-amber-400 bg-[#00000050] transition-colors rounded py-4 px-3 z-20 absolute top-[40%] right-0 cursor-pointer border border-white max-[578px]:hidden"
                  onClick={() => {
                    setCount((prev) => prev + 1);
                    setShouldRunInterval(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
                <button
                  className="hover:text-amber-400 bg-[#00000050] transition-colors rounded py-4 px-3 z-20 absolute top-[40%] left-0 cursor-pointer border border-white max-[578px]:hidden"
                  onClick={() => {
                    setCount((prev) => prev - 1);
                    setShouldRunInterval(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-3 items-end absolute bg-[linear-gradient(transparent_70%,#000000,#000000)] inset-0 px-[2%] h-full w-full">
                <div className="basis-[20%] relative z-10 selection:bg-none">
                  <img
                    className="w-full min-w-[70px]"
                    src={data && data[Math.abs(count) % data.length].poster}
                  />
                </div>
                <div className="min-[578px]:flex gap-3 items-center z-10 min-[992px]:text-2xl text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                    style={{ aspectRatio: "1" }}
                    className="hover:text-amber-400 z-10 w-[12%] min-w-[32px] transition-colors cursor-not-allowed"
                  >
                    <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                    <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                  </svg>
                  {data && data[Math.abs(count) % data.length].title}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
        <section className="flex-grow max-[992px]:hidden relative">
          <h1 className="text-xl font-bold text-amber-400 p-2">Up next</h1>
          <div className="p-3 bg-[linear-gradient(#55555560,black_40%)] overflow-hidden relative h-full">
            <AnimatePresence initial={false}>
              <motion.div
                key={count}
                initial={{ y: direction * 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "tween" }}
                className="flex flex-col gap-3 absolute inset-3"
              >
                <div className="flex gap-2">
                  <img
                    className="w-[24%]"
                    src={data && data[Math.abs(count + 1) % data.length].poster}
                  />
                  <div className="flex-grow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                      style={{ aspectRatio: "1" }}
                      className="hover:text-amber-400 my-2 z-10 w-[10%] min-w-[32px] transition-colors cursor-not-allowed"
                    >
                      <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                      <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                    </svg>
                    <p>
                      {data && data[Math.abs(count + 1) % data.length].title}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <img
                    className="w-[24%]"
                    src={data && data[Math.abs(count + 2) % data.length].poster}
                  />
                  <div className="flex-grow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                      style={{ aspectRatio: "1" }}
                      className="hover:text-amber-400 my-2 z-10 w-[10%] min-w-[32px] transition-colors cursor-not-allowed"
                    >
                      <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                      <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                    </svg>
                    <p>
                      {data && data[Math.abs(count + 2) % data.length].title}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <img
                    className="w-[24%]"
                    src={data && data[Math.abs(count + 3) % data.length].poster}
                  />
                  <div className="flex-grow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                      style={{ aspectRatio: "1" }}
                      className="hover:text-amber-400 my-2 z-10 w-[10%] min-w-[32px] transition-colors cursor-not-allowed"
                    >
                      <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                      <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                    </svg>
                    <p>
                      {data && data[Math.abs(count + 3) % data.length].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <h1 className="font-bold text-lg absolute bottom-[2.5rem] hover:text-amber-400 cursor-not-allowed transition-colors">
              Browse Trailers
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 inline h-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </h1>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Carousel;
