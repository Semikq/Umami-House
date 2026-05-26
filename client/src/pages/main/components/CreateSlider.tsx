import {useCallback, useEffect, useRef, useState} from "react";
import getImage from "../../../utils/getImage.ts";

const SLIDE_ANIM_MS = 700;
const AUTOPLAY_MS = 15000;

function getRectInStage(element, stage) {
    const stageBox = stage.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    return {
        top: box.top - stageBox.top,
        left: box.left - stageBox.left,
        width: box.width,
        height: box.height,
    };
}

function scaleRect(rect, scale) {
    const width = rect.width * scale;
    const height = rect.height * scale;
    return {
        top: rect.top + (rect.height - height) / 2,
        left: rect.left + (rect.width - width) / 2,
        width,
        height,
    };
}

function rectStyle(rect) {
    return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
    };
}

export default function CreateSlider({ sale = [] }) {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 500);
    const [animPhase, setAnimPhase] = useState("idle");
    const [flyDirection, setFlyDirection] = useState(0);
    const [flyLayers, setFlyLayers] = useState([]);
    const [paused, setPaused] = useState(false);
    const isAnimating = useRef(false);
    const touchStartX = useRef(0);
    const stageRef = useRef(null);
    const prevRef = useRef(null);
    const activeRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 500);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (index >= sale.length) setIndex(0);
    }, [index, sale.length]);

    const navigate = useCallback((delta) => {
        if (isAnimating.current || sale.length <= 1) return;

        if (isMobile) {
            setIndex((prev) => (prev + delta + sale.length) % sale.length);
            return;
        }

        const stage = stageRef.current;
        const sourceEl = delta > 0 ? nextRef.current : prevRef.current;
        const targetEl = activeRef.current;
        const sideTargetEl = delta > 0 ? prevRef.current : nextRef.current;
        if (!stage || !sourceEl || !targetEl || !sideTargetEl) return;

        const promoteSlide = sale[(index + delta + sale.length) % sale.length];
        const demoteSlide = sale[index];
        const enterSlide = sale[(index + delta * 2 + sale.length) % sale.length];

        const activeRect = getRectInStage(targetEl, stage);
        const sideRect = getRectInStage(sideTargetEl, stage);
        const sourceRect = getRectInStage(sourceEl, stage);
        const enterTargetRect = delta > 0
            ? getRectInStage(nextRef.current, stage)
            : getRectInStage(prevRef.current, stage);

        const layers = [
            {
                id: "demote",
                className: "saleSlider__flyout saleSlider__flyout--demote",
                src: getImage(demoteSlide.image_url),
                alt: demoteSlide.title,
                from: activeRect,
                to: sideRect,
                active: false,
            },
            {
                id: "promote",
                className: "saleSlider__flyout saleSlider__flyout--promote",
                src: getImage(promoteSlide.image_url),
                alt: promoteSlide.title,
                from: sourceRect,
                to: activeRect,
                active: false,
            },
        ];

        if (sale.length > 2) {
            const enterSrc = getImage(enterSlide.image_url);
            const preload = new Image();
            preload.src = enterSrc;

            layers.push({
                id: "enter",
                className: "saleSlider__flyout saleSlider__flyout--enter",
                src: enterSrc,
                alt: enterSlide.title,
                from: scaleRect(enterTargetRect, 0.55),
                to: enterTargetRect,
                active: false,
            });
        }

        isAnimating.current = true;
        setFlyDirection(delta);
        setAnimPhase("flying");
        setFlyLayers(layers);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setFlyLayers((current) =>
                    current.map((layer) => ({...layer, active: true}))
                );
            });
        });

        window.setTimeout(() => {
            setIndex((prev) => (prev + delta + sale.length) % sale.length);
            setFlyDirection(0);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const ready = Array.from(
                        stageRef.current?.querySelectorAll(".saleSlider__slide img") ?? []
                    ).map((node) => {
                        const img = node as HTMLImageElement;
                        if (img.complete) return Promise.resolve();
                        if (img.decode) return img.decode().catch(() => undefined);
                        return new Promise((resolve) => {
                            img.onload = resolve;
                            img.onerror = resolve;
                        });
                    });

                    Promise.all(ready).finally(() => {
                        setAnimPhase("idle");

                        requestAnimationFrame(() => {
                            setFlyLayers([]);
                            isAnimating.current = false;
                        });
                    });
                });
            });
        }, SLIDE_ANIM_MS);
    }, [sale, index, isMobile]);

    useEffect(() => {
        if (sale.length <= 1 || isMobile || paused) return;

        const id = window.setInterval(() => navigate(1), AUTOPLAY_MS);
        return () => window.clearInterval(id);
    }, [navigate, sale.length, isMobile, paused]);

    if (!sale.length) return null;

    const prevSlide = () => navigate(-1);
    const nextSlide = () => navigate(1);

    const getSlide = (offset) => sale[(index + offset + sale.length) % sale.length];
    const activeSlide = sale[index];

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) < 40) return;
        if (diff > 0) nextSlide();
        else prevSlide();
    };

    const stageClass = [
        "saleSlider__stage",
        animPhase === "flying" && "saleSlider__stage--flying",
        animPhase === "flying" && flyDirection > 0 && "saleSlider__stage--flying-next",
        animPhase === "flying" && flyDirection < 0 && "saleSlider__stage--flying-prev",
    ].filter(Boolean).join(" ");

    return (
        <section
            className="saleSliderSection"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                ref={stageRef}
                className={stageClass}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {!isMobile && sale.length > 1 && (
                    <button
                        type="button"
                        ref={prevRef}
                        className="saleSlider__slide saleSlider__slide--side saleSlider__slide--prev"
                        onClick={prevSlide}
                        disabled={animPhase !== "idle"}
                    >
                        <img src={getImage(getSlide(-1).image_url)} alt={getSlide(-1).title} decoding="async"/>
                    </button>
                )}

                <article
                    ref={activeRef}
                    className="saleSlider__slide saleSlider__slide--active"
                >
                    <img src={getImage(activeSlide.image_url)} alt={activeSlide.title} decoding="async"/>
                </article>

                {!isMobile && sale.length > 1 && (
                    <button
                        type="button"
                        ref={nextRef}
                        className="saleSlider__slide saleSlider__slide--side saleSlider__slide--next"
                        onClick={nextSlide}
                        disabled={animPhase !== "idle"}
                    >
                        <img src={getImage(getSlide(1).image_url)} alt={getSlide(1).title} decoding="async"/>
                    </button>
                )}

                {flyLayers.map((layer) => (
                    <div
                        key={layer.id}
                        className={`${layer.className}${layer.active ? " is-active" : ""}`}
                        style={rectStyle(layer.active ? layer.to : layer.from)}
                    >
                        <img src={layer.src} alt={layer.alt}/>
                    </div>
                ))}
            </div>
        </section>
    );
}
