import { MovieDetails, Credits_API } from "./interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "./Skeleton";
const apiKey = import.meta.env.VITE_APP_API_KEY;

function QueryDetails() {
  const { id } = useParams();

  const options = {
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/title/get-overview-details",
    params: { tconst: `${id}` },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  const options_2 = {
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/title/get-full-credits",
    params: {
      tconst: `${id}`,
    },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: [id + "overview-details"],
    queryFn: async () => {
      const { data } = await axios<MovieDetails>(options);
      return data;
    },
    staleTime: 60000,
  });

  const { data: data_2, isLoading: isLoading_2 } = useQuery({
    queryKey: [id + "full-credits"],
    queryFn: async () => {
      const { data } = await axios<Credits_API>(options_2);
      return data;
    },
    staleTime: 60000,
  });

  function formatRatingCount(number: number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  }

  const runningTime = Number(data?.title.runningTimeInMinutes);

  function FormatRunTime(runningTime: number) {
    const hours = Math.floor(runningTime / 60);
    const minutes = runningTime % 60;
    if (runningTime === 0) return;
    return `${hours}h${minutes === 0 ? "" : ` ${minutes}min`}`;
  }

  console.log(isError);
  console.log(data_2);

  const skeletonTransition = {
    repeat: Infinity,
    duration: 1.5,
    ease: "easeInOut",
    repeatType: "reverse" as const,
  };

  return (
    <div className="text-white relative min-[578px]:px-16 px-6 py-12 max-[992px]:py-8 min-h-screen">
      <div
        className="absolute inset-0 -z-10 h-full bg-cover bg-no-repeat bg-[center_top] blur-3xl bg-neutral-500 bg-blend-multiply"
        style={{ backgroundImage: `url(${data?.title.image?.url})` }}
      ></div>
      {!isLoading ? (
        <>
          <div className="mb-4 max-w-5xl mx-auto">
            <h1 className="min-[578px]:text-5xl text-4xl py-[6px]">
              {data?.title.title}
            </h1>
            <p className="text-base max-[578px]:text-sm text-[#ffffffc0]">
              {data?.title.titleType}
            </p>
            <div className="flex text-sm max-[578px]:text-xs font-medium text-[#ffffffc0]">
              <p>{data?.title.year}</p>
              <p className="before:content-[''] before:inline-block before:rounded-full before:w-[2px] before:h-[2px] before:mx-[6px] before:mb-1 before:bg-[#ffffff9c] after:content-[''] after:inline-block after:rounded-full after:w-[2px] after:h-[2px] after:mx-[6px] after:mb-1 after:bg-[#ffffff9c]">
                {data?.certificates?.US[0].certificate}
              </p>
              <p>{FormatRunTime(runningTime ? runningTime : 0)}</p>
            </div>
          </div>
          <div className="flex max-[992px]:flex-col min-[992px]:gap-10 gap-5 max-w-5xl mx-auto">
            <div className="basis-1/2 min-[992px]:min-w-[280px] max-w-[80%] mx-auto bg-neutral-600 shadow-md h-fit">
              <img
                className="w-full"
                src={data?.title.image?.url}
                draggable={false}
              />
            </div>
            <div className="flex-grow flex flex-col min-[992px]:gap-10 gap-5 items-start max-[992px]:items-center">
              <div className="flex flex-col items-center h-fit">
                <span className="text-sm tracking-[1px] font-bold">
                  IMDB RATING
                </span>
                <div className="flex flex-col font-bold">
                  <div className="flex gap-[4px] items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="text-amber-400"
                      id="iconContext-star"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                    >
                      <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                    </svg>
                    <span className="text-lg">{data?.ratings.rating}</span>
                    <span className="text-[#ffffffa4] text-sm">/10</span>
                  </div>
                </div>
                <p className="text-[12px] ml-1 font-medium text-[#ffffffa4]">
                  {formatRatingCount(data?.ratings.ratingCount ?? 0)}
                </p>
              </div>
              <div>
                <div className="flex gap-2 flex-wrap">
                  {data?.genres.map((genres, index) => (
                    <span
                      className="text-sm px-2 py-1 border border-[#ffffff54] rounded-2xl"
                      key={index}
                    >
                      {genres}
                    </span>
                  ))}
                </div>
                <p className="leading-5 mt-3 ">
                  {data?.plotOutline?.text || data?.plotSummary?.text}
                </p>
                <div className="mt-10 ">
                  <div className="min-[587px]:flex items-center py-2 border-t border-[#ffffff41]">
                    <span className="mr-4 font-bold">Directors</span>
                    <div className="flex flex-wrap">
                      {isLoading_2
                        ? [1, 2, 3].map((_, index) => (
                            <div
                              key={index}
                              className="h-4 w-24 inline-block bg-neutral-600 mr-4 overflow-hidden relative"
                            >
                              <motion.span
                                animate={{ x: ["100%", "-100%"] }}
                                transition={skeletonTransition}
                                className="absolute inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)]"
                              ></motion.span>
                            </div>
                          ))
                        : data_2?.crew.director
                            ?.slice(0, 3)
                            .map((dir, index) => (
                              <span
                                className={`text-[#5e84ff] whitespace-nowrap ${
                                  index >= 1 &&
                                  'before:content-[""] before:inline-block before:rounded-full before:w-[2px] before:h-[2px] before:mx-2 before:mb-1 before:bg-[#ffffff88]'
                                }`}
                                key={index}
                              >
                                {dir.name}
                              </span>
                            ))}
                    </div>
                  </div>
                  <div className="min-[587px]:flex items-center py-2 border-t border-[#ffffff41]">
                    <span className="mr-4 font-bold">Writers</span>
                    <div className="flex flex-wrap">
                      {isLoading_2
                        ? [1, 2, 3].map((_, index) => (
                            <div
                              key={index}
                              className="h-4 w-24 inline-block bg-neutral-600 mr-4 overflow-hidden relative"
                            >
                              <motion.span
                                animate={{ x: ["100%", "-100%"] }}
                                transition={skeletonTransition}
                                className="absolute inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)]"
                              ></motion.span>
                            </div>
                          ))
                        : data_2?.crew.writer
                            ?.slice(0, 3)
                            .map((writers, index) => (
                              <span
                                className={`text-[#5e84ff] whitespace-nowrap ${
                                  index >= 1 &&
                                  'before:content-[""] before:inline-block before:rounded-full before:w-[2px] before:h-[2px] before:mx-2 before:mb-1 before:bg-[#ffffff88]'
                                }`}
                                key={index}
                              >
                                {writers.name}
                              </span>
                            ))}
                    </div>
                  </div>
                  <div className="min-[587px]:flex items-center py-2 border-t border-[#ffffff41]">
                    <span className="mr-4 font-bold">Stars</span>
                    <div className="flex flex-wrap">
                      {isLoading_2
                        ? [1, 2, 3, 4].map((_, index) => (
                            <div
                              key={index}
                              className="h-4 w-24 inline-block bg-neutral-600 mr-4 overflow-hidden relative"
                            >
                              <motion.span
                                animate={{ x: ["100%", "-100%"] }}
                                transition={skeletonTransition}
                                className="absolute inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)]"
                              ></motion.span>
                            </div>
                          ))
                        : data_2?.cast.slice(0, 4).map((cast, index) => (
                            <span
                              className={`text-[#5e84ff] whitespace-nowrap ${
                                index >= 1 &&
                                'before:content-[""] before:inline-block before:rounded-full before:w-[2px] before:h-[2px] before:mx-2 before:mb-1 before:bg-[#ffffff88]'
                              }`}
                              key={index}
                            >
                              {cast.name}
                            </span>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : !isError ? (
        <Skeleton />
      ) : (
        <div className="text-red-500">something went wrong!</div>
      )}
    </div>
  );
}

export default QueryDetails;
