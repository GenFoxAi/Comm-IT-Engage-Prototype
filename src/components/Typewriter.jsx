import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import clsx from "clsx";

export const TextGenerateEffect = ({
  words = "",
  className,
  filter = true,
  duration = 0.5,
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
   
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      {
        duration: duration,
        delay: stagger(0.03), 
      }
    );
  }, [scope, animate, filter, duration]);

  const renderWords = () =>
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => {
        return (
          <motion.span
            key={`${word}-${idx}`}
            className="dark:text-white text-black opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        );
      })}
    </motion.div>;

  return (
    <div className={clsx("", className)}>
      <div className="">
        <div className="text-white  text-[16px]">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
