import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Testimonial } from "./testimonial-model";
import Image from "next/image";

const Testimonials = ({ testimonials, cornerRadius }: { testimonials: Testimonial[], cornerRadius?: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [_cornerRadius, setCornerRadius] = useState(cornerRadius || '75px');

    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);



    const currentTestimonial = testimonials[currentIndex];

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            handlePrevious();
        } else if (e.key === 'ArrowRight') {
            handleNext();
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    return (
        <div 
            className="relative w-full h-full overflow-hidden"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="Testimonial Carousel"
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                    aria-hidden="true"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${currentTestimonial.background})`,
                            borderTopLeftRadius: _cornerRadius,
                            borderBottomLeftRadius: _cornerRadius,
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Preload next image */}
            <div className="hidden" aria-hidden="true">
                <Image
                    src={testimonials[(currentIndex + 1) % testimonials.length].background}
                    alt="Preload next"
                    width={1}
                    height={1}
                />
                <Image
                    src={testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].background}
                    alt="Preload previous"
                    width={1}
                    height={1}
                />
            </div>

            {/* Navigation buttons - always visible */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
                <button
                    onClick={handlePrevious}
                    className="p-2 rounded-full border-white border-1 text-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Previous testimonial"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={handleNext}
                    className="p-2 rounded-full border-white border-1 text-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Next testimonial"
                >
                    <ArrowRight size={24} />
                </button>
            </div>

            <AnimatePresence>
                <motion.div 
                    key={currentIndex}
                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        borderBottomLeftRadius: _cornerRadius,
                        borderTopLeftRadius: _cornerRadius,
                    }}
                >
                    <motion.div
                        className="p-12 text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <motion.p 
                            className="text-2xl mb-4 italic"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            “{currentTestimonial.testimonial}”
                        </motion.p>
                        <motion.div 
                            className="flex items-center"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">{currentTestimonial.author.name}</p>
                                <p className="text-sm mt-4">{currentTestimonial.author.title}</p>
                                <p className="text-sm">{currentTestimonial.author.position}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
            <div className="sr-only" aria-live="polite">
                Showing testimonial {currentIndex + 1} of {testimonials.length}
            </div>
        </div>
    );
};

export default Testimonials;

Testimonials.displayName = "Testimonials";
