import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import clsx from "clsx";

export const TextGenerateEffect = ({
  words = "",
  className,
  filter = true,
  duration = 0.5,
  onComplete,
}) => {
  const [scope, animate] = useAnimate();

  const wordsArray = words.split(/(<[^>]+>)/g).filter(Boolean);

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      {
        duration: duration,
        delay: stagger(0.03),
        onComplete: onComplete,
      }
    );
  }, [scope, animate, filter, duration, onComplete]);

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => {
        const isHtml = /<[^>]+>/.test(word);

        return (
          <motion.span
            key={`${word}-${idx}`}
            className="dark:text-white text-black opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {isHtml ? (
              <span dangerouslySetInnerHTML={{ __html: word }} />
            ) : (
              word
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );

  return (
    <div className={clsx("", className)}>
      <div className="">
        <div className="text-white text-[16px]">{renderWords()}</div>
      </div>
    </div>
  );
};
