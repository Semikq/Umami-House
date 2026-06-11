import {useCallback, useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import getImage from "../../../utils/getImage.ts";

const VISIBLE_COUNT = 5;
const SLIDE_MS = 700;
const AUTOPLAY_MS = 4000;

export default function CreateOurPartners({partners = []}) {
    const [startIndex, setStartIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isLocked, setIsLocked] = useState(false);
    const trackRef = useRef(null);
    const stepRef = useRef(0);
    const unlockTimerRef = useRef(null);
    const autoplayRef = useRef(null);
    const pausedRef = useRef(false);
    const isLockedRef = useRef(false);

    const canSlide = partners.length > VISIBLE_COUNT;

    const measureStep = useCallback(() => {
        const slide = trackRef.current?.querySelector(".partners__slide");
        const track = trackRef.current;
        if (!slide || !track) return;

        const gap = Number.parseFloat(getComputedStyle(track).gap) || 60;
        stepRef.current = slide.getBoundingClientRect().width + gap;
    }, []);

    const setLocked = useCallback((value) => {
        isLockedRef.current = value;
        setIsLocked(value);
    }, []);

    const unlock = useCallback(() => {
        if (unlockTimerRef.current) {
            window.clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = null;
        }
        setLocked(false);
    }, [setLocked]);

    const finishNextSlide = useCallback(() => {
        setTransitionEnabled(false);
        setStartIndex((prev) => (prev + 1) % partners.length);
        setTranslateX(0);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTransitionEnabled(true);
                unlock();
            });
        });
    }, [partners.length, unlock]);

    const slideNext = useCallback(() => {
        if (!canSlide || isLockedRef.current) return;

        measureStep();
        setLocked(true);
        setTransitionEnabled(true);
        setTranslateX(-stepRef.current);
        unlockTimerRef.current = window.setTimeout(finishNextSlide, SLIDE_MS + 40);
    }, [canSlide, measureStep, finishNextSlide, setLocked]);

    const restartAutoplay = useCallback(() => {
        if (autoplayRef.current) {
            window.clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }

        if (!canSlide) return;

        autoplayRef.current = window.setInterval(() => {
            if (!pausedRef.current) slideNext();
        }, AUTOPLAY_MS);
    }, [canSlide, slideNext]);

    const navigate = useCallback((delta) => {
        if (!canSlide || isLockedRef.current) return;

        restartAutoplay();

        if (delta > 0) {
            slideNext();
            return;
        }

        measureStep();
        setLocked(true);
        setTransitionEnabled(false);
        setStartIndex((prev) => (prev - 1 + partners.length) % partners.length);
        setTranslateX(-stepRef.current);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTransitionEnabled(true);
                setTranslateX(0);
                unlockTimerRef.current = window.setTimeout(unlock, SLIDE_MS + 40);
            });
        });
    }, [canSlide, measureStep, unlock, restartAutoplay, slideNext, setLocked, partners.length]);

    useEffect(() => {
        restartAutoplay();
        return () => {
            if (autoplayRef.current) window.clearInterval(autoplayRef.current);
            if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
        };
    }, [restartAutoplay]);

    useEffect(() => {
        measureStep();
        window.addEventListener("resize", measureStep);
        return () => window.removeEventListener("resize", measureStep);
    }, [measureStep, partners.length, startIndex]);

    if (!partners.length) return null;

    const slideCount = canSlide ? VISIBLE_COUNT + 1 : partners.length;
    const slides = [];

    for (let i = 0; i < slideCount; i++) {
        slides.push(partners[(startIndex + i) % partners.length]);
    }

    const trackStyle = {
        transform: `translateX(${translateX}px)`,
        transition: transitionEnabled
            ? `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
    };

    return (
        <section className="partners">
            <div className="partners__header">
                <button
                    type="button"
                    className="partners__nav"
                    onClick={() => navigate(-1)}
                    disabled={!canSlide || isLocked}
                    aria-label="Попередні партнери"
                >
                    <Icon icon="solar:round-arrow-left-linear" color="#333333"/>
                </button>

                <h2>Наші партнери</h2>

                <button
                    type="button"
                    className="partners__nav"
                    onClick={() => navigate(1)}
                    disabled={!canSlide || isLocked}
                    aria-label="Наступні партнери"
                >
                    <Icon icon="solar:round-arrow-right-linear" color="#333333"/>
                </button>
            </div>

            <div
                className="partners__viewport"
                onMouseEnter={() => { pausedRef.current = true; }}
                onMouseLeave={() => { pausedRef.current = false; }}
            >
                <div
                    className="partners__window"
                    style={{["--partners-visible" as string]: canSlide ? VISIBLE_COUNT : partners.length}}
                >
                    <div
                        ref={trackRef}
                        className="partners__track"
                        style={trackStyle}
                    >
                        {slides.map((partner, index) => (
                            <div className="partners__slide" key={`${partner.uuid}-${index}`}>
                                <img
                                    className="partners__logo"
                                    src={getImage(partner.logo_img)}
                                    alt={partner.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
