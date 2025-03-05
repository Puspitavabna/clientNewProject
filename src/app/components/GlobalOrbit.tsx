"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import earth from "/public/images/earth.png";
import moon1 from "/public/images/moon1.png";
import { getGlobalObject } from "../store/actions/home/homeActions";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const GlobeOrbit = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);

  const dispatch = useDispatch();
  const moons: any = useSelector(
    (state: RootState) => state.homeData?.globalOrbit,
  );
  const loading: any = useSelector(
    (state: RootState) => state.homeData?.loading,
  );

  const actions = useMemo(
    () => bindActionCreators({ getGlobalObject }, dispatch),
    [dispatch],
  );

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    actions.getGlobalObject();

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [actions]);

  // Responsive sizing
  const orbitRadius = Math.min(windowSize.width, windowSize.height) * 0.3; // Adjust based on screen size
  const orbitSize = orbitRadius * 2;
  const earthSize = Math.min(windowSize.width, windowSize.height) * 0.15; // Adjust Earth size
  const moonSize = earthSize * 0.8; // Adjust moon size

  const handleHover = (hovering: boolean) => {
    setIsHovering(hovering);
  };

  // Calculate the left and top for the Earth
  const isSmallScreen = windowSize.width < 768; // Define the screen width threshold
  const earthLeft = isSmallScreen ? "45%" : "46%";
  const earthTop = isSmallScreen ? "41%" : "42%";
    
   
  return (
    <div className="relative flex h-[90vh] items-center justify-center overflow-hidden bg-[#E6EDFC] lg:h-[80vh]">
      {/* Orbit Circle */}
      <div
        className="absolute overflow-hidden rounded-full border-[3px] border-[#151B54] "
        style={{
          width: orbitSize,
          height: orbitSize,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Moons Rotating Around the Orbit */}
      <motion.div
        animate={{ rotate: isHovering ? rotation : 360 }}
        transition={{
          repeat: Infinity,
          duration: isHovering ? 0 : 60,
          ease: "linear",
          onUpdate: (latest: any) => {
            if (!isHovering) {
              setRotation(latest.rotate);
            }
          },
        }}
        className="absolute flex h-full w-full items-center justify-center"
      >
        {moons.map((moon: any, index: number) => {
          const angle = (index * (360 / moons.length) * Math.PI) / 180;
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px - ${moonSize / 2}px)`,
                top: `calc(50% + ${y}px - ${moonSize / 2}px)`,
              }}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <Image
                src={moon && !moon?.image.includes("example") ? moon1 : moon1}
                alt={`Moon ${index + 1}`}
                width={moonSize}
                height={moonSize}
                className="rounded-full transition-transform duration-300 hover:scale-110"
                priority
              />
            </div>
          );
        })}
      </motion.div>

      {/* Earth in Center */}
      <motion.div
        animate={isHovering ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isHovering ? { repeat: Infinity, duration: 20, ease: "linear" } : {}
        }
        className="absolute"
        style={{
          width: earthSize,
          height: earthSize,
          left: earthLeft,
          top: earthTop,
          transform: "translate(-50%, -50%)",
        }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <Image
          src={earth}
          alt="Earth"
          width={earthSize}
          height={earthSize}
          className="rounded-full transition-transform duration-300 hover:scale-110"
          priority
        />
      </motion.div>
    </div>
  );
};

export default GlobeOrbit;
