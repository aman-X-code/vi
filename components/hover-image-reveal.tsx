"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Transition as MotionTransition,
} from "framer-motion";

interface Item {
  text?: string;
  meta?: string;
  image?: { src?: string; alt?: string };
  link?: string;
}


interface ItemsValue {
  itemCount?: number;
  [key: string]: unknown;
}

const MAX_ITEMS = 6;

interface FontValue {
  fontSize?: number | string;
  letterSpacing?: number | string;
  lineHeight?: number | string;
  [key: string]: unknown;
}

interface HoverImageRevealProps {
  items?: ItemsValue;
  font?: FontValue;
  textColor?: string;
  dimColor?: string;
  align?: "left" | "center" | "right";
  rowGap?: number;
  imageWidth?: number;
  imageHeight?: number;
  rounded?: number;
  offsetX?: number;
  offsetY?: number;
  followStrength?: number;
  transition?: MotionTransition;
  backgroundColor?: string;
  style?: CSSProperties;
}

const DEFAULT_ITEMS_DATA = [
  { text: "NOA", src: "/noa-skincare.png" },
  { text: "Stories in print", src: "/editorial-art.png" },
];

const DEFAULT_ITEMS: ItemsValue = {
  itemCount: DEFAULT_ITEMS_DATA.length,
  item1: { text: DEFAULT_ITEMS_DATA[0].text, image: { src: DEFAULT_ITEMS_DATA[0].src } },
  item2: { text: DEFAULT_ITEMS_DATA[1].text, image: { src: DEFAULT_ITEMS_DATA[1].src } },
};


const DEFAULT_FONT: FontValue = {
  fontFamily: "var(--serif)",
  fontWeight: 400,
  fontSize: "clamp(48px, 8vw, 112px)",
  lineHeight: ".88",
  letterSpacing: "-.065em",
  textAlign: "left",
};


const DEFAULT_TRANSITION: MotionTransition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
};

const alignToFlex: Record<string, CSSProperties["alignItems"]> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};
const alignToText: Record<string, CSSProperties["textAlign"]> = {
  left: "left",
  center: "center",
  right: "right",
};

function HoverImageRevealBase({
  items = DEFAULT_ITEMS,
  font = DEFAULT_FONT,
  textColor = "#24233d",
  dimColor = "#9e968f",
  align = "left",
  rowGap = 24,
  imageWidth = 280,
  imageHeight = 350,
  rounded = 2,
  offsetX = 180,
  offsetY = 0,

  followStrength = 0,
  transition = DEFAULT_TRANSITION,
  backgroundColor = "transparent",

  style,
}: HoverImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeTransition = prefersReducedMotion ? { duration: 0 } : transition;

  const rawX = useMotionValue(0);

  const rawY = useMotionValue(0);
  const stiffness = 60 + followStrength * 5;
  const springCfg = { stiffness, damping: 28, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  const data = items || DEFAULT_ITEMS;
  const count = Math.max(
    1,
    Math.min(MAX_ITEMS, (data.itemCount as number) || 5)
  );
  const list: Item[] = [];
  for (let i = 1; i <= count; i++) {
    const it = data[`item${i}`] as Item | undefined;
    const fallback = DEFAULT_ITEMS_DATA[i - 1];
    list.push({
      text: it?.text ?? fallback?.text ?? `Item ${i}`,
      meta: it?.meta,
      image: it?.image ?? (fallback ? { src: fallback.src } : undefined),
      link: it?.link,

    });
  }
  const anyActive = hovered != null;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left + offsetX);
    rawY.set(e.clientY - rect.top + offsetY);
  };


  return (
    <div
      ref={containerRef}
      className="hover-image-reveal"
      onPointerMove={onMove}

      onPointerLeave={() => setHovered(null)}

      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: alignToFlex[align],
        gap: `${rowGap}px`,
        padding: 24,
        boxSizing: "border-box",
        cursor: "default",
        ...(font as CSSProperties),
        ...style,
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",

          top: 0,
          left: 0,
          x: prefersReducedMotion ? rawX : x,
          y: prefersReducedMotion ? rawY : y,

          translateX: "-50%",
          translateY: "-50%",
          width: imageWidth,
          height: imageHeight,
          borderRadius: rounded,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 2,
        }}
        animate={{ opacity: anyActive ? 1 : 0 }}
        transition={activeTransition}

      >
        {list.map((item, i) => {
          const src = item.image?.src;
          const yPos =
            hovered == null
              ? "100%"
              : i < hovered
                ? "-100%"
                : i > hovered
                  ? "100%"
                  : "0%";
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ y: yPos }}
              transition={activeTransition}

              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {src ? (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="280px"
                  draggable={false}
                  style={{ objectFit: "cover" }}
                />

              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg,#333,#111)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div
        className="hover-image-reveal-list"
        onPointerLeave={() => setHovered(null)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: alignToFlex[align],
          gap: `${rowGap}px`,
        }}
      >

        {list.map((item, i) => {
          const isHovered = hovered === i;
          const color = anyActive ? (isHovered ? textColor : dimColor) : textColor;
          const copyStyle: CSSProperties = {
            display: "block",
            color,
            transition: "color 0.2s ease",
            whiteSpace: "pre",
            textAlign: alignToText[align],
          };
          const inner = (
            <div className="hover-image-reveal-copy">
              <div className="hover-image-reveal-title">
                <motion.div
                  className="hover-image-reveal-title-track"
                  style={{ position: "relative" }}
                  animate={{ y: isHovered ? "-100%" : "0%" }}
                  transition={activeTransition}
                >
                  <span style={copyStyle}>{item.text}</span>
                  <span
                    aria-hidden
                    style={{
                      ...copyStyle,
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                    }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              </div>
              {item.meta && <span className="hover-image-reveal-meta">{item.meta}</span>}
            </div>
          );
          return (
            <div
              className="hover-image-reveal-item"
              key={i}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setHovered(i);
              }}
              onFocus={(event) => {
                if (event.target.matches(":focus-visible")) setHovered(i);
              }}
              onBlur={() => setHovered(null)}
              style={{ cursor: item.link ? "pointer" : "default" }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
              {item.image?.src && (
                <div className="hover-image-reveal-mobile-image">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || ""}
                    fill
                    sizes="(max-width: 700px) calc(100vw - 88px), 1px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          );

        })}
      </div>
    </div>
  );
}

export default function HoverImageReveal(props: HoverImageRevealProps) {
  return <HoverImageRevealBase {...props} />;
}

