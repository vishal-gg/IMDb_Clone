import {motion} from 'framer-motion';

const parentVariants = {
    hidden: {},
    show: {},
  };
  const childrenTransition = {
    repeat: Infinity,
    duration: 1.5,
    ease: "easeInOut",
    repeatType: "reverse" as const,
  };
  const childrenVarients = {
    show: { x: ["-100%", "100%"] },
  };

function Skeleton() {
  return (
    <div className='absolute inset-[1.5rem_3rem_1.5rem_3rem] opacity-80'>
        <div className='py-[3%] max-w-5xl mx-auto'>
            <motion.div initial="hidden" animate="show" variants={parentVariants}>
            <div className="py-6 bg-neutral-700 w-[max(50%,300px)] mb-2 relative overflow-hidden">
                <motion.span
                initial={{ x: 0 }}
                variants={childrenVarients}
                transition={childrenTransition}
                className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                ></motion.span>
            </div>
            <div className="py-3 bg-neutral-700 w-[max(30%,200px)] mb-5 relative overflow-hidden">
                <motion.span
                initial={{ x: 0 }}
                variants={childrenVarients}
                transition={childrenTransition}
                className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                ></motion.span>
            </div>
            <div className="flex gap-8 max-[992px]:flex-col">
                <div
                style={{
                    aspectRatio: "2/3",
                }}
                className="bg-neutral-700 basis-[25%] min-w-[280px] max-[992px]:w-[75%] max-[992px]:mx-auto max-[578px]:w-[85%] relative overflow-hidden"
                >
                <motion.span
                    initial={{ x: 0 }}
                    variants={childrenVarients}
                    transition={childrenTransition}
                    className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                ></motion.span>
                </div>
                <div className="flex-grow">
                <div className="bg-neutral-700 py-8 w-[max(18%,80px)] mb-12 max-[992px]:mb-6 max-[992px]:mx-auto relative overflow-hidden">
                    <motion.span
                    initial={{ x: 0 }}
                    variants={childrenVarients}
                    transition={childrenTransition}
                    className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                    ></motion.span>
                </div>
                <div className="flex gap-2 mb-4">
                    <span className="bg-neutral-700 py-3 px-10 rounded-2xl relative overflow-hidden">
                    <motion.span
                        initial={{ x: 0 }}
                        variants={childrenVarients}
                        transition={childrenTransition}
                        className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                    ></motion.span>
                    </span>
                    <span className="bg-neutral-700 py-3 px-10 rounded-2xl relative overflow-hidden">
                    <motion.span
                        initial={{ x: 0 }}
                        variants={childrenVarients}
                        transition={childrenTransition}
                        className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                    ></motion.span>
                    </span>
                    <span className="bg-neutral-700 py-3 px-10 rounded-2xl relative overflow-hidden">
                    <motion.span
                        initial={{ x: 0 }}
                        variants={childrenVarients}
                        transition={childrenTransition}
                        className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                    ></motion.span>
                    </span>
                </div>
                <div className="py-8 bg-neutral-700 w-[max(90%,250px)] mb-10 max-[992px]:mb-6 relative overflow-hidden">
                    <motion.span
                    variants={childrenVarients}
                    transition={childrenTransition}
                    className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                    ></motion.span>
                </div>
                <div className="py-4 bg-neutral-700 w-[max(70%,200px)] mb-4 relative overflow-hidden">
                    <motion.span
                    animate={{ x: ["100%", "-100%"] }}
                    transition={childrenTransition}
                    className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                    ></motion.span>
                </div>
                <div className="py-4 bg-neutral-700 w-[max(70%,200px)] mb-4 relative overflow-hidden">
                    <motion.span
                    animate={{ x: ["100%", "-100%"] }}
                    transition={childrenTransition}
                    className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                    ></motion.span>
                </div>
                <div className="py-4 bg-neutral-700 w-[max(70%,200px)] mb-4 relative overflow-hidden">
                    <motion.span
                    animate={{ x: ["100%", "-100%"] }}
                    transition={childrenTransition}
                    className="absolute blur-lg inset-0 bg-[linear-gradient(90deg,transparent,#ffffff50,transparent)] opacity-50"
                    ></motion.span>
                </div>
                </div>
            </div>
            </motion.div>
        </div>
    </div>
  )
}

export default Skeleton
