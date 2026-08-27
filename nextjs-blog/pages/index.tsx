"use client";
// import '../styles/v2/v2.css'

import Head from "next/head";
import type { GetServerSideProps } from "next";
import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import HeroSection from "../components/v2/HeroSection";
import AboutV2 from "../components/v2/AboutV2";
import CareerV2 from "../components/v2/CareerV2";
import ProjectsCardsV2 from "../components/v2/ProjectsCardsV2";
import ContactV2 from "../components/v2/ContactV2";
import Loader from "../components/v2/Loader";
import SideDecor from "../components/v2/SideDecor";
import HeaderV2 from "../components/v2/HeaderV2";
import ScrollbarV2 from "../components/v2/ScrollbarV2";
import { usePortfolioI18n } from "../components/v2/i18n";
import { getProjectCardGroups } from "../components/v2/projets/projectCards";

const PREVIEW_PATH = "/preview.png";

type PortfolioV2Props = {
    pageUrl: string;
    ogImageUrl: string;
    ogImageSecureUrl: string | null;
};

export const getServerSideProps: GetServerSideProps<PortfolioV2Props> = async ({
    req,
}) => {
    const envSiteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

    const forwardedHost = req.headers["x-forwarded-host"];
    const host = Array.isArray(forwardedHost)
        ? forwardedHost[0]
        : forwardedHost || req.headers.host || "";

    const forwardedProtoHeader = req.headers["x-forwarded-proto"];
    const forwardedProto = Array.isArray(forwardedProtoHeader)
        ? forwardedProtoHeader[0]
        : forwardedProtoHeader;
    const proto =
        forwardedProto?.split(",")[0].trim() ||
        (host.includes("localhost") ? "http" : "https");
    const requestSiteUrl = host ? `${proto}://${host}` : "";

    const siteUrl = (requestSiteUrl || envSiteUrl).replace(/\/+$/, "");
    const pageUrl = siteUrl || "/";
    const ogImageUrl = siteUrl ? `${siteUrl}${PREVIEW_PATH}` : PREVIEW_PATH;
    const ogImageSecureUrl = ogImageUrl.startsWith("https://")
        ? ogImageUrl
        : null;

    return {
        props: {
            pageUrl,
            ogImageUrl,
            ogImageSecureUrl,
        },
    };
};

export default function PortfolioV2({
    pageUrl,
    ogImageUrl,
    ogImageSecureUrl,
}: PortfolioV2Props) {
    const [isLoading, setIsLoading] = useState(true);
    const { language, setLanguage, copy } = usePortfolioI18n();
    const projectGroups = useMemo(
        () => getProjectCardGroups(copy.projects.cards),
        [copy.projects.cards],
    );

    useEffect(() => {
        const prevRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
        document.documentElement.classList.add("v2-page");
        document.body.classList.add("v2-page");
        return () => {
            window.history.scrollRestoration = prevRestoration;
            document.documentElement.classList.remove("v2-page");
            document.body.classList.remove("v2-page");
        };
    }, []);

    useEffect(() => {
        if (isLoading) return;

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const shouldUseNativeScroll = window.matchMedia(
            "(max-width: 1023px)",
        ).matches;
        ScrollTrigger.config({
            limitCallbacks: true,
            ignoreMobileResize: shouldUseNativeScroll,
        });

        document.body.classList.toggle("v2-smooth", !shouldUseNativeScroll);
        let cancelled = false;
        let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;
        let idleCallbackHandle: number | null = null;
        let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

        const setupSmoother = () => {
            if (cancelled) return;

            smoother = shouldUseNativeScroll
                ? null
                : ScrollSmoother.create({
                      wrapper: "#smooth-wrapper",
                      content: "#smooth-content",
                      smooth: 1.15,
                      effects: false,
                  });

            if (smoother) smoother.scrollTop(0);
            else window.scrollTo(0, 0);
        };

        if ("requestIdleCallback" in window) {
            idleCallbackHandle = window.requestIdleCallback(setupSmoother, {
                timeout: 500,
            });
        } else {
            timeoutHandle = globalThis.setTimeout(setupSmoother, 180);
        }

        return () => {
            cancelled = true;
            document.body.classList.remove("v2-smooth");
            if (idleCallbackHandle !== null && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleCallbackHandle);
            }
            if (timeoutHandle !== null) {
                globalThis.clearTimeout(timeoutHandle);
            }
            smoother?.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [isLoading]);

    useEffect(() => {
        const finishLoading = () => setIsLoading(false);

        if (document.readyState === "complete") {
            finishLoading();
            return;
        }

        window.addEventListener("load", finishLoading);
        return () => window.removeEventListener("load", finishLoading);
    }, []);

    return (
        <>
            <Loader isLoading={isLoading} />
            <Head>
                <title>{copy.meta.title}</title>
                <meta
                    name="description"
                    content={copy.meta.description}
                />
                <meta
                    name="keywords"
                    content={copy.meta.keywords}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta
                    property="og:site_name"
                    content="Mathieu Hernandez Portfolio"
                />
                <meta
                    property="og:title"
                    content={copy.meta.title}
                />
                <meta
                    property="og:description"
                    content={copy.meta.ogDescription}
                />
                <meta property="og:image" content={ogImageUrl} />
                {ogImageSecureUrl ? (
                    <meta
                        property="og:image:secure_url"
                        content={ogImageSecureUrl}
                    />
                ) : null}
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="644" />
                <meta property="og:image:type" content="image/png" />
                <meta
                    property="og:image:alt"
                    content={copy.meta.imageAlt}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={pageUrl} />
                <meta
                    name="twitter:title"
                    content={copy.meta.title}
                />
                <meta
                    name="twitter:description"
                    content={copy.meta.twitterDescription}
                />
                <meta name="twitter:image" content={ogImageUrl} />
                <meta
                    name="twitter:image:alt"
                    content={copy.meta.imageAlt}
                />
                <link
                    rel="preload"
                    href="/fonts/Sora-Regular.otf"
                    as="font"
                    type="font/otf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Sora-SemiBold.otf"
                    as="font"
                    type="font/otf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Sora-Bold.otf"
                    as="font"
                    type="font/otf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/MangoGrotesque-Black.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/MangoGrotesque-ExtraBold.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link rel="canonical" href={pageUrl} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeaderV2
                copy={copy}
                language={language}
                onLanguageChange={setLanguage}
            />
            {!isLoading ? <ScrollbarV2 /> : null}
            <main className="v2-blend-page">
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        {!isLoading ? <SideDecor /> : null}
                        <HeroSection copy={copy.hero} />
                        <AboutV2 copy={copy.about} />
                        <ProjectsCardsV2
                            webProjects={projectGroups.web}
                            otherProjects={projectGroups.others}
                            copy={copy.projects}
                        />
                        <CareerV2 copy={copy.career} />
                        <ContactV2 copy={copy.contact} />
                    </div>
                </div>
            </main>
        </>
    );
}
