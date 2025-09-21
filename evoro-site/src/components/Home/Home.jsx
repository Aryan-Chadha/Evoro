import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icons from "./Icons";
export default function Home() {
    const [hoverRow, setHoverRow] = useState(null);
    const [activeBox, setActiveBox] = useState(null);
    const [dimBackground, setDimBackground] = useState(false);
    const contentRef = useRef(null);

    const boxes = [
        {
            id: 1,
            title: "Services",
            content:
                "Our passion stems from enhancing our understanding and expertise in the creative field.",
            image: "/images/pic_1.webp",
            color: "bg-purple-600",
        },
        {
            id: 2,
            title: "Projects",
            content: "A curated selection of our latest digital and product design projects.",
            image: "/images/pic_2.webp",
            color: "bg-blue-600",
        },
        {
            id: 3,
            title: "About",
            content:
                "We’re a creative studio from Bengaluru, seeking to provide imaginative digital answers to your needs.",
            image: "/images/pic_3.webp",
            color: "bg-green-600",
        },
        {
            id: 4,
            title: "Contact",
            content: "Reach out to us for collaborations and project discussions.",
            image: "/images/pic_4.webp",
            color: "bg-red-600",
        },
    ];

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // Smooth scroll into view when overlay opens
    useEffect(() => {
        if (activeBox && contentRef.current) {
            setTimeout(() => {
                contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        }
    }, [activeBox]);

    // Handle background dimming on mobile when scrolling
    useEffect(() => {
        if (isMobile) {
            const handleScroll = () => {
                const scrollY = window.scrollY;
                if (scrollY > 50) {
                    setDimBackground(true);
                } else {
                    setDimBackground(false);
                }
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [isMobile]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row relative">
            {/* Left Section (fixed and vertically centered on desktop) */}
            <motion.div
                animate={
                    isMobile && dimBackground
                        ? { opacity: 0.3 }
                        : { opacity: 1 }
                }
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/2 flex flex-col justify-center p-8 space-y-4 sticky md:top-0 md:h-screen z-20"
            >
                {/* Logo + Studio name */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white font-bold">
                        <img className="rounded-full" src="/images/logo_evoro.webp" alt="logo" />
                    </div>
                    <span className="text-xl font-semibold font-['Chillax', sans-serif] tracking-wide cursor-default">
                        Evoro.Stud
                        <span className="relative inline-block">
                            i
                            <div className="absolute bg-black rounded-full top-0  w-1.5 h-2.5"></div>
                            <span className="text-xl absolute top-[-0.3em] left-1/2 transform -translate-x-1/2  text-red-500">
                                ·
                            </span>
                        </span>
                        os
                    </span>
                </div>

                <p className="relative text-gray-400 tracking-widest text-sm font-['Chillax', sans-serif]">
                    <motion.div
                        className="absolute shadow-sm shadow-gray-400 top-2 bg-white w-1.5 h-1.5 rounded-full"
                        animate={{
                            scale: [0, 1.2, 1],
                            opacity: [0, 0.8, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            repeatDelay: 0
                        }}
                    ></motion.div>
                    &nbsp;&nbsp;&nbsp;Smart Design. Lasting Impressions.
                </p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Website design studio from Bengaluru
                </h1>
                <p className="text-gray-400">
                    We’re a creative studio seeking to provide imaginative digital answers
                    to your needs.
                </p>
                <a
                    href="mailto:evorostudios@gmail.com"
                    className="relative inline-block group"
                >
                    <span className="bg-left-bottom bg-gradient-to-r from-purple-600 to-pink-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        evorostudios@gmail.com
                    </span>
                </a>
                <Icons/>
            </motion.div>

            {/* Right Section (scrolls) */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 p-8 relative overflow-y-auto z-10">
                {/* Dimmed backdrop when overlay active */}
                <AnimatePresence>
                    {activeBox && (
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black z-30"
                        />
                    )}
                </AnimatePresence>

                {/* Overlay */}
                <AnimatePresence>
                    {activeBox && (
                        <motion.div
                            key={`overlay-${activeBox}`}
                            initial={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
                            animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                            exit={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 1, restDelta: 0.01 }}
                            className="absolute inset-0 z-40 flex flex-col p-0 overflow-y-auto transform-gpu"
                            ref={contentRef}
                        >
                            {/* Top back bar */}
                            <div className="sticky top-0 z-50">
                                <div className={`rounded-t-2xl ${boxes.find((b) => b.id === activeBox)?.color} h-14 flex items-center px-6`}>
                                    <button
                                        onClick={() => setActiveBox(null)}
                                        className="text-white text-sm flex items-center gap-2"
                                    >
                                        <span className="text-2xl">←</span>
                                        <span>Back</span>
                                    </button>
                                </div>
                            </div>

                            {/* Content area */}
                            <div className={`flex-1 ${boxes.find((b) => b.id === activeBox)?.color} rounded-b-2xl px-6 py-6 overflow-auto relative flex flex-col justify-start`}>
                                <h3 className="text-sm text-white opacity-90">
                                    {boxes.find((b) => b.id === activeBox)?.title}.
                                </h3>
                                <h2 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">
                                    {boxes.find((b) => b.id === activeBox)?.content}
                                </h2>
                                <div className="absolute right-10 bottom-10 text-white opacity-90 text-6xl md:text-8xl select-none">
                                    ✦
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Interactive Grid */}
                <div className="flex flex-col gap-8 relative z-10">
                    {boxes.map((box) => (
                        isMobile ? (
                            // Mobile: Single tall box with number + title together + fade effect
                            <motion.div
                                key={box.id}
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: box.id * 0.1 }}
                                className={`relative rounded-2xl flex flex-col justify-between items-start p-6 h-56 cursor-pointer overflow-hidden ${activeBox === box.id ? box.color + " bg-opacity-70" : "bg-neutral-900"}`}
                                onClick={() => setActiveBox(box.id)}
                            >
                                <img
                                    src={box.image}
                                    alt={box.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                                />
                                <div className={`absolute inset-0 ${box.color} ${activeBox === box.id ? "opacity-60" : "opacity-0 hover:opacity-40"} transition duration-500`} />
                                <div className="absolute inset-0 bg-[url('/images/grain.png')] opacity-20 mix-blend-overlay pointer-events-none hover:opacity-40 transition duration-500" />
                                <div className="relative z-10 flex flex-col gap-2">
                                    <motion.p
                                        initial={{ backgroundSize: "0% 100%" }}
                                        whileHover={{ backgroundSize: "100% 100%" }}
                                        transition={{ duration: 0.6 }}
                                        className="text-6xl font-extrabold text-white drop-shadow-md"
                                    >
                                        {box.id.toString().padStart(2, "0")}
                                    </motion.p>
                                    <p className="text-lg font-medium">{box.title}</p>
                                </div>
                            </motion.div>
                        ) : (
                            // Desktop: Previous alternating row layout
                            <div
                                key={box.id}
                                className={`flex flex-col md:flex-row gap-4 h-40 md:h-60 relative cursor-pointer`}
                                onMouseEnter={() => setHoverRow(box.id)}
                                onMouseLeave={() => setHoverRow(null)}
                                onClick={() => setActiveBox(box.id)}
                            >
                                {(box.id % 2 !== 0
                                    ? [
                                        { type: "label", flexGrow: 2 },
                                        { type: "number", flexGrow: 1 },
                                    ]
                                    : [
                                        { type: "number", flexGrow: 1 },
                                        { type: "label", flexGrow: 2 },
                                    ]).map((part, partIndex) => (
                                        <motion.div
                                            key={partIndex}
                                            layout
                                            animate={{
                                                flex:
                                                    hoverRow === box.id
                                                        ? part.flexGrow + 1
                                                        : part.flexGrow,
                                            }}
                                            transition={{ duration: 0.35 }}
                                            className={`relative rounded-2xl flex items-end justify-start p-6 text-left overflow-hidden w-full group ${activeBox === box.id ? box.color + " bg-opacity-70" : "bg-neutral-900"
                                                }`}
                                        >
                                            <img
                                                src={box.image}
                                                alt={box.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition duration-500"
                                            />
                                            <div className={`absolute inset-0 ${box.color} ${activeBox === box.id ? "opacity-60" : "opacity-0 group-hover:opacity-40"} transition duration-500`} />
                                            <div className="absolute inset-0 bg-[url('/images/grain.png')] opacity-20 mix-blend-overlay pointer-events-none group-hover:opacity-40 transition duration-500" />
                                            {part.type === "label" ? (
                                                <p className="relative text-lg md:text-xl font-medium z-10">
                                                    {box.title}
                                                </p>
                                            ) : (
                                                <>
                                                    <motion.p
                                                        initial={{ backgroundSize: "0% 100%" }}
                                                        whileHover={{ backgroundSize: "100% 100%" }}
                                                        transition={{ duration: 0.6 }}
                                                        className="relative text-gray-200 text-7xl md:text-9xl font-extrabold z-10 bg-clip-text  bg-gradient-to-r from-white to-gray-400"
                                                        style={{ backgroundRepeat: "no-repeat" }}
                                                    >
                                                        {box.id.toString().padStart(2, "0")}
                                                    </motion.p>
                                                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10rem] md:text-[18rem] font-extrabold opacity-5 select-none pointer-events-none">
                                                        {box.id.toString().padStart(2, "0")}
                                                    </span>
                                                </>
                                            )}
                                        </motion.div>
                                    ))}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}