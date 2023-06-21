import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface PropsType {
  setToggleMobileAside: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleAside: React.Dispatch<React.SetStateAction<boolean>>;
}

function SM_ScreenSidebar({ setToggleMobileAside, setToggleAside }: PropsType) {
  const [expandedUl, setExpandedUl] = useState<HTMLUListElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // programatically adding classes to Elements
    const ul = document.querySelectorAll("ul");
    const heading = document.querySelectorAll("h1");

    ul.forEach((ul) => {
      ul.classList.add("grid", "grid-rows-[0fr]", "transition-all");
      ul.children[0].classList.add("overflow-hidden");

      const liElements = ul.querySelectorAll("li");

      liElements.forEach((li) => {
        li.classList.add(
          "pb-3",
          "ml-6",
          "opacity-70",
          "hover:opacity-100",
          "transition-opacity",
          "cursor-pointer"
        );
      });
    });

    heading.forEach((h1) => {
      h1.classList.add("pb-4", "cursor-pointer", "group");

      h1.tabIndex = 0;
      const svg = h1.querySelectorAll("svg");
      svg.forEach((svg) => {
        svg.classList.add(
          "opacity-60",
          "group-hover:opacity-100",
          "transition-opacity",
          "group-focus:opacity-100"
        );
      });
    });

    //closing sidebar on outside click 
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebar.current && !sidebar.current?.contains(e.target as Node)) {
        setToggleMobileAside(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    //handling sidebar on window size
    const handleSidebar = () => {
      if (window.innerWidth > 990) {
        setToggleMobileAside(false);
        setToggleAside(true);
      }
    };

    window.addEventListener("resize", handleSidebar);

    return () => {
      window.removeEventListener("resize", handleSidebar);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showMenu = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const heading = e.currentTarget;
    const ul = heading.nextElementSibling as HTMLUListElement;

    if (ul) {
      if (ul === expandedUl) {
        // Collapse the currently expanded ul
        ul.classList.remove("grid-rows-[1fr]");
        heading.classList.remove("text-amber-400");
        heading.parentElement?.classList.remove("border-b", "mb-3");

        removeRotateClass(heading);
        setExpandedUl(null);
      } else {
        // Collapse the previously expanded ul
        if (expandedUl) {
          expandedUl.classList.remove("grid-rows-[1fr]");
          expandedUl.previousElementSibling?.classList.remove("text-amber-400");
          expandedUl.parentElement?.classList.remove("border-b", "mb-3");
          removeRotateClass(
            expandedUl.previousElementSibling as HTMLHeadingElement
          );
        }
        // Expand the clicked ul
        ul.classList.add("grid-rows-[1fr]");
        heading.classList.add("text-amber-400", "transition-colors");
        heading.parentElement?.classList.add(
          "border-b",
          "border-[#ffffff5d]",
          "mb-3"
        );
        addRotateClass(heading);
        setExpandedUl(ul);
      }
    }
  };

  const addRotateClass = (element: HTMLHeadingElement) => {
    element.children[1].classList.add("-rotate-180", "transition-transform");
  };

  const removeRotateClass = (element: HTMLHeadingElement) => {
    element.children[1].classList.remove("-rotate-180");
  };

  return (
    <motion.aside
      initial={{ x: "-300px" }}
      animate={{ x: 0 }}
      exit={{ x: "-300px" }}
      transition={{ type: "tween", duration: 0.23 }}
      className="fixed inset-0 z-50 flex"
    >
      <motion.div
        ref={sidebar}
        initial={{ boxShadow: "0 0 0 10000px rgba(0,0,0,.0)" }}
        animate={{ boxShadow: "0 0 0 10000px rgba(0,0,0,.4)" }}
        exit={{ boxShadow: "0 0 0 10000px rgba(0,0,0,.0)" }}
        className="flex-grow max-w-[280px] bg-slate-950 text-white overflow-auto select-none"
      >
        <div
          style={{
            backgroundImage:
              "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXzdOZkFEIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNi41IiBoZWlnaHQ9IjYuNSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDEzMikiPjxsaW5lIHgxPSIwIiB5PSIwIiB4Mj0iMCIgeTI9IjYuNSIgc3Ryb2tlPSIjNUY1RjVGIiBzdHJva2Utd2lkdGg9IjUiLz48L3BhdHRlcm4+PC9kZWZzPiA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm5fN05mQUQpIiBvcGFjaXR5PSIwLjQ5Ii8+PC9zdmc+')",
          }}
          className="relative h-14"
        >
          <span className="absolute inset-y-0 right-1 my-auto rounded-full h-12 aspect-[1] cursor-pointer transition-colors hover:bg-[rgba(104,104,104,0.3)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 absolute inset-0 m-auto"
              id="close"
              onClick={() => setToggleMobileAside(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
        <div className="p-4">
          <div>
            <h1 className="flex justify-between" onClick={(e) => showMenu(e)}>
              <span className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  id="iconContext-movie"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
                </svg>
                Movies
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                id="iconContext-chevron-right"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
                style={{ color: "white" }}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7.41 8.59a.996.996 0 0 0-1.41 1.41L12 15.41l5.59-5.59a.996.996 0 1 0-1.41-1.41L12 12.59l-3.18-3.18a.996.996 0 0 0-1.41 0z"></path>
              </svg>
            </h1>
            <ul>
              <div>
                <li>Release Calendar</li>
                <li>Top 250 Movies</li>
                <li>Most Popular Movies</li>
                <li>Browse Movies by Genre</li>
                <li>Top Box Office</li>
                <li>Showtimes & Tickets</li>
                <li>Movie News</li>
                <li>India Movie Spotlight</li>
              </div>
            </ul>
          </div>
          <div>
            <h1 className="flex justify-between" onClick={(e) => showMenu(e)}>
              <span className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  id="iconContext-television"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"></path>
                </svg>
                TV Shows
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                id="iconContext-chevron-right"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
                style={{ color: "white" }}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7.41 8.59a.996.996 0 0 0-1.41 1.41L12 15.41l5.59-5.59a.996.996 0 1 0-1.41-1.41L12 12.59l-3.18-3.18a.996.996 0 0 0-1.41 0z"></path>
              </svg>
            </h1>
            <ul>
              <div>
                <li>What's on TV & Streaming</li>
                <li>Top 250 TV Shows</li>
                <li>Most Popular TV Shows</li>
                <li>Browse TV Shows by Genre</li>
                <li>TV News</li>
              </div>
            </ul>
          </div>
          <div>
            <h1 className="flex justify-between" onClick={(e) => showMenu(e)}>
              <span className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  id="iconContext-video-library"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                  className=""
                >
                  <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
                </svg>
                Watch
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                id="iconContext-chevron-right"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
                style={{ color: "white" }}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7.41 8.59a.996.996 0 0 0-1.41 1.41L12 15.41l5.59-5.59a.996.996 0 1 0-1.41-1.41L12 12.59l-3.18-3.18a.996.996 0 0 0-1.41 0z"></path>
              </svg>
            </h1>
            <ul>
              <div>
                <li>What to Watch</li>
                <li>Latest Trailers</li>
                <li>IMDb Originals</li>
                <li>IMDb Picks</li>
                <li>IMDb Podcasts</li>
              </div>
            </ul>
          </div>
          <div>
            <h1 className="flex justify-between" onClick={(e) => showMenu(e)}>
              <span className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  id="iconContext-star-circle-filled"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                  className=""
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.23 15.39L12 15.45l-3.22 1.94a.502.502 0 0 1-.75-.54l.85-3.66-2.83-2.45a.505.505 0 0 1 .29-.88l3.74-.32 1.46-3.45c.17-.41.75-.41.92 0l1.46 3.44 3.74.32a.5.5 0 0 1 .28.88l-2.83 2.45.85 3.67c.1.43-.36.77-.74.54z"></path>
                </svg>
                Awards & Events
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                id="iconContext-chevron-right"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
                style={{ color: "white" }}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7.41 8.59a.996.996 0 0 0-1.41 1.41L12 15.41l5.59-5.59a.996.996 0 1 0-1.41-1.41L12 12.59l-3.18-3.18a.996.996 0 0 0-1.41 0z"></path>
              </svg>
            </h1>
            <ul>
              <div>
                <li>Oscars</li>
                <li>ABFF</li>
                <li>Pride Month</li>
                <li>Outfest Outfronts</li>
                <li>STARmeter Awards</li>
                <li>Awards Central</li>
                <li>Festival Central</li>
                <li>All Events</li>
              </div>
            </ul>
          </div>
          <div>
            <h1 className="flex justify-between" onClick={(e) => showMenu(e)}>
              <span className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  id="iconContext-people"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                  className=""
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"></path>
                </svg>
                Celebs
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                id="iconContext-chevron-right"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
                style={{ color: "white" }}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7.41 8.59a.996.996 0 0 0-1.41 1.41L12 15.41l5.59-5.59a.996.996 0 1 0-1.41-1.41L12 12.59l-3.18-3.18a.996.996 0 0 0-1.41 0z"></path>
              </svg>
            </h1>
            <ul>
              <div>
                <li>Born Today</li>
                <li>Most Popular Celebs</li>
                <li>Celebrity News</li>
              </div>
            </ul>
          </div>
          <div>
            <h1 className="flex justify-between" onClick={(e) => showMenu(e)}>
              <span className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  id="iconContext-earth"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                  className=""
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                </svg>
                Community
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                id="iconContext-chevron-right"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
                style={{ color: "white" }}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7.41 8.59a.996.996 0 0 0-1.41 1.41L12 15.41l5.59-5.59a.996.996 0 1 0-1.41-1.41L12 12.59l-3.18-3.18a.996.996 0 0 0-1.41 0z"></path>
              </svg>
            </h1>
            <ul>
              <div>
                <li>Help Center</li>
                <li>Contributor Zone</li>
                <li>Polls</li>
              </div>
            </ul>
          </div>
          <div className="mt-8 flex justify-between">
            <span>
              <svg
                width="52"
                height="14"
                viewBox="0 0 52 14"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <g fill="currentColor">
                  <rect x="0" y="1" width="3.21" height="12.34"></rect>
                  <path d="M10,1 L9.3,6.76 L8.84,3.63 C8.7,2.62 8.58,1.75 8.45,1 L4.3,1 L4.3,13.34 L7.11,13.34 L7.11,5.19 L8.3,13.34 L10.3,13.34 L11.42,5 L11.42,13.33 L14.22,13.33 L14.22,1 L10,1 Z"></path>
                  <path d="M19.24,3.22 C19.3711159,3.29185219 19.4602235,3.42180078 19.48,3.57 C19.5340993,3.92393477 19.554191,4.28223587 19.54,4.64 L19.54,9.42 C19.578852,9.92887392 19.5246327,10.4405682 19.38,10.93 C19.27,11.12 18.99,11.21 18.53,11.21 L18.53,3.11 C18.7718735,3.09406934 19.0142863,3.13162626 19.24,3.22 Z M19.24,13.34 C19.8163127,13.3574057 20.3928505,13.3138302 20.96,13.21 C21.3245396,13.1481159 21.6680909,12.9969533 21.96,12.77 C22.2288287,12.5438006 22.4209712,12.2398661 22.51,11.9 C22.643288,11.1679419 22.6969338,10.4236056 22.67,9.68 L22.67,5.34 C22.6662002,4.55669241 22.6060449,3.77467335 22.49,3 C22.43037,2.59841431 22.260779,2.22116094 22,1.91 C21.6636187,1.56093667 21.2326608,1.317654 20.76,1.21 C19.7709421,1.02848785 18.7647002,0.958050915 17.76,1 L15.32,1 L15.32,13.34 L19.24,13.34 Z"></path>
                  <path d="M27.86,10.34 C27.8769902,10.7218086 27.8501483,11.1043064 27.78,11.48 C27.72,11.63 27.46,11.71 27.26,11.71 C27.0954951,11.7299271 26.9386363,11.6349863 26.88,11.48 C26.7930212,11.1542289 26.7592527,10.8165437 26.78,10.48 L26.78,7.18 C26.7626076,6.84408875 26.7929089,6.50740774 26.87,6.18 C26.9317534,6.03447231 27.0833938,5.94840616 27.24,5.97 C27.43,5.97 27.7,6.05 27.76,6.21 C27.8468064,6.53580251 27.8805721,6.87345964 27.86,7.21 L27.86,10.34 Z M23.7,1 L23.7,13.34 L26.58,13.34 L26.78,12.55 C27.0112432,12.8467609 27.3048209,13.0891332 27.64,13.26 C28.0022345,13.4198442 28.394069,13.5016184 28.79,13.5 C29.2588971,13.515288 29.7196211,13.3746089 30.1,13.1 C30.4399329,12.8800058 30.6913549,12.5471372 30.81,12.16 C30.9423503,11.6167622 31.0061799,11.0590937 31,10.5 L31,7 C31.0087531,6.51279482 30.9920637,6.02546488 30.95,5.54 C30.904474,5.28996521 30.801805,5.05382649 30.65,4.85 C30.4742549,4.59691259 30.2270668,4.40194735 29.94,4.29 C29.5869438,4.15031408 29.2096076,4.08232558 28.83,4.09 C28.4361722,4.08961884 28.0458787,4.16428368 27.68,4.31 C27.3513666,4.46911893 27.0587137,4.693713 26.82,4.97 L26.82,1 L23.7,1 Z"></path>
                  <path d="M32.13,1 L35.32,1 C35.9925574,0.978531332 36.6650118,1.04577677 37.32,1.2 C37.717112,1.29759578 38.0801182,1.50157071 38.37,1.79 C38.6060895,2.05302496 38.7682605,2.37391646 38.84,2.72 C38.935586,3.27463823 38.9757837,3.8374068 38.96,4.4 L38.96,5.46 C38.9916226,6.03689533 38.9100917,6.61440551 38.72,7.16 C38.5402933,7.53432344 38.2260614,7.82713037 37.84,7.98 C37.3049997,8.18709035 36.7332458,8.28238268 36.16,8.26 L35.31,8.26 L35.31,13.16 L32.13,13.16 L32.13,1 Z M35.29,3.08 L35.29,6.18 L35.53,6.18 C35.7515781,6.20532753 35.9725786,6.12797738 36.13,5.97 C36.2717869,5.69610033 36.3308522,5.38687568 36.3,5.08 L36.3,4.08 C36.3390022,3.79579475 36.2713114,3.5072181 36.11,3.27 C35.8671804,3.11299554 35.5771259,3.04578777 35.29,3.08 Z"></path>
                  <path d="M42,4.36 L41.89,5.52 C42.28,4.69 43.67,4.42 44.41,4.37 L43.6,7.3 C43.2290559,7.27725357 42.8582004,7.34593052 42.52,7.5 C42.3057075,7.61238438 42.1519927,7.81367763 42.1,8.05 C42.0178205,8.59259006 41.9843538,9.14144496 42,9.69 L42,13.16 L39.34,13.16 L39.34,4.36 L42,4.36 Z"></path>
                  <path d="M51.63,9.71 C51.6472876,10.3265292 51.6003682,10.9431837 51.49,11.55 C51.376862,11.9620426 51.1639158,12.3398504 50.87,12.65 C50.5352227,13.001529 50.1148049,13.2599826 49.65,13.4 C49.0994264,13.5686585 48.5257464,13.6496486 47.95,13.64 C47.3333389,13.6524659 46.7178074,13.5818311 46.12,13.43 C45.6996896,13.322764 45.3140099,13.1092627 45,12.81 C44.7275808,12.5275876 44.5254637,12.1850161 44.41,11.81 C44.2627681,11.2181509 44.1921903,10.6098373 44.2,10 L44.2,7.64 C44.1691064,6.9584837 44.2780071,6.27785447 44.52,5.64 C44.7547114,5.12751365 45.1616363,4.71351186 45.67,4.47 C46.3337168,4.13941646 47.0688388,3.97796445 47.81,4 C48.4454888,3.98667568 49.0783958,4.08482705 49.68,4.29 C50.1352004,4.42444561 50.5506052,4.66819552 50.89,5 C51.1535526,5.26601188 51.3550281,5.58700663 51.48,5.94 C51.6001358,6.42708696 51.6506379,6.92874119 51.63,7.43 L51.63,9.71 Z M48.39,6.73 C48.412199,6.42705368 48.3817488,6.12255154 48.3,5.83 C48.2091142,5.71223121 48.0687606,5.64325757 47.92,5.64325757 C47.7712394,5.64325757 47.6308858,5.71223121 47.54,5.83 C47.447616,6.12046452 47.4136298,6.42634058 47.44,6.73 L47.44,10.93 C47.4168299,11.2204468 47.4508034,11.5126191 47.54,11.79 C47.609766,11.9270995 47.7570827,12.0067302 47.91,11.99 C48.0639216,12.0108082 48.2159732,11.9406305 48.3,11.81 C48.3790864,11.5546009 48.4096133,11.2866434 48.39,11.02 L48.39,6.73 Z"></path>
                </g>
              </svg>
              <span className="text-sm">For Industry Professionals</span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              id="iconContext-launch"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              <path d="M16 16.667H8A.669.669 0 0 1 7.333 16V8c0-.367.3-.667.667-.667h3.333c.367 0 .667-.3.667-.666C12 6.3 11.7 6 11.333 6h-4C6.593 6 6 6.6 6 7.333v9.334C6 17.4 6.6 18 7.333 18h9.334C17.4 18 18 17.4 18 16.667v-4c0-.367-.3-.667-.667-.667-.366 0-.666.3-.666.667V16c0 .367-.3.667-.667.667zm-2.667-10c0 .366.3.666.667.666h1.727L9.64 13.42a.664.664 0 1 0 .94.94l6.087-6.087V10c0 .367.3.667.666.667.367 0 .667-.3.667-.667V6h-4c-.367 0-.667.3-.667.667z"></path>
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}

export default SM_ScreenSidebar;
