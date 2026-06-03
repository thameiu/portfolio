"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    FaEnvelope,
    FaLinkedin,
    FaGithub,
    FaFileDownload,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CVModal from "../v1/CVModal";
import CuteLinks from "../v1/CuteLinks";
import GlitchTitle from "./GlitchTitle";

const CONTACT_OVERLAP = "clamp(-120px, -7vw, -36px)";
const CONTACT_BG_GLYPHS = [
    { char: "#", x: 7, y: 14, size: "clamp(3.4rem, 8vw, 8.2rem)", rot: "-8deg", opacity: 0.14 },
    { char: "&", x: 16, y: 33, size: "clamp(3rem, 6.6vw, 6.8rem)", rot: "11deg", opacity: 0.12 },
    { char: "~", x: 24, y: 16, size: "clamp(2.8rem, 6vw, 6rem)", rot: "-5deg", opacity: 0.1 },
    { char: "-", x: 31, y: 46, size: "clamp(3.2rem, 7vw, 7.2rem)", rot: "18deg", opacity: 0.12 },
    { char: "/", x: 42, y: 20, size: "clamp(3.8rem, 8.5vw, 8.8rem)", rot: "-14deg", opacity: 0.16 },
    { char: "<", x: 52, y: 35, size: "clamp(3rem, 6.8vw, 6.9rem)", rot: "7deg", opacity: 0.11 },
    { char: "}", x: 61, y: 13, size: "clamp(4rem, 9vw, 9.4rem)", rot: "-4deg", opacity: 0.16 },
    { char: ":", x: 69, y: 43, size: "clamp(3.2rem, 6.5vw, 6.6rem)", rot: "9deg", opacity: 0.1 },
    { char: "#", x: 79, y: 22, size: "clamp(3.6rem, 7.4vw, 7.8rem)", rot: "-12deg", opacity: 0.15 },
    { char: "&", x: 91, y: 15, size: "clamp(2.8rem, 6vw, 6.1rem)", rot: "4deg", opacity: 0.1 },
    { char: "~", x: 11, y: 67, size: "clamp(3.9rem, 8.8vw, 8.9rem)", rot: "-9deg", opacity: 0.14 },
    { char: "/", x: 21, y: 79, size: "clamp(3rem, 6.5vw, 6.7rem)", rot: "15deg", opacity: 0.11 },
    { char: "☺︎", x: 34, y: 63, size: "clamp(4.2rem, 9.4vw, 9.6rem)", rot: "-6deg", opacity: 0.17 },
    { char: "}", x: 44, y: 84, size: "clamp(3.5rem, 7.6vw, 7.9rem)", rot: "8deg", opacity: 0.13 },
    { char: ":", x: 55, y: 70, size: "clamp(3.1rem, 6.3vw, 6.5rem)", rot: "-11deg", opacity: 0.1 },
    { char: "-", x: 66, y: 86, size: "clamp(4rem, 8.8vw, 9rem)", rot: "12deg", opacity: 0.14 },
    { char: "#", x: 76, y: 67, size: "clamp(3.2rem, 6.8vw, 7rem)", rot: "-3deg", opacity: 0.12 },
    { char: "&", x: 86, y: 82, size: "clamp(3.7rem, 8vw, 8.2rem)", rot: "6deg", opacity: 0.15 },
    { char: "?", x: 95, y: 60, size: "clamp(2.9rem, 6.1vw, 6.3rem)", rot: "-15deg", opacity: 0.1 },
] as const;

function ContactGlyphBackground() {
    return (
        <div className="v2-contact-glyph-bg" aria-hidden="true">
            {CONTACT_BG_GLYPHS.map((glyph, idx) => (
                <span
                    key={`${glyph.char}-${idx}`}
                    className="v2-contact-glyph"
                    style={
                        {
                            ["--v2-glyph-left" as string]: `${glyph.x}%`,
                            ["--v2-glyph-top" as string]: `${glyph.y}%`,
                            ["--v2-glyph-size" as string]: glyph.size,
                            ["--v2-glyph-rot" as string]: glyph.rot,
                            ["--v2-glyph-opacity" as string]: glyph.opacity,
                        } as React.CSSProperties
                    }
                >
                    {glyph.char}
                </span>
            ))}
        </div>
    );
}

/* ─── ASCII cat art ────────────────────────────── */
const CAT_LINES = [
    "                                                                                                -.: ",
    "                                                                                                :.:=",
    "                                                                                               -::- ",
    "                                                                                            ---:.:= ",
    "                                                       *=+                                :-==:.:== ",
    "                                                 +  =-:::::::                          ---=+-::..:= ",
    "                                               -:::--::::::::::-                +=  :::-=++-:::-==  ",
    "                                              =-:.:---::::::::.::::=--:---====-::::---=++=-::::-*   ",
    "                                             +-::.----==--:-:::::::..:::..::.:-::::--=++=--::::=    ",
    "                                             +==----:::=-=:----.::::::::.::..-======+++=--::::=     ",
    "                                               ++*==--::--=-:--::::::::::::..:--=---=+=-------=     ",
    "                                                *+===--::::::-:::----::-=:::-:::--=+++-----::--     ",
    "                                                 *+==-:-::::--:--==----=::-=-:::-=++==----==---     ",
    "                                                +=====--:::-==-=-=-=-----:-------==-----::-=--=     ",
    "                                               *+=---:-::::-==:---:--=--::-=-------::::::-----=     ",
    "                                              #++=--::::::--=--:-::-:=----=--------::::-::---=+     ",
    "                                              *++=-----:::-----...::=:-=-:------:-:::::::::::-=     ",
    "                                              *+-======:--=::-:...:-=:=:::------::::::::::..:-+*    ",
    "                                             *++=++=====-=+-:::...:-:==::-==----:::::::::::..:-+    ",
    "                                             *+++++=++=+=++-:::..:=--=-::===--=-::::::::::.....:-   ",
    "                                             #*+**=+=+++++*=---::-======-++==----:-::::::.::..::-=+ ",
    "                                             ****+**##***++=====-==-=====++++====+++==-:::::::::-+* ",
    "                                             #****++*###*+#*+++====----=+***++++#*+=--==-::::::-=++ ",
    "                                              #*******######*+++=--.:-=+*#**+**#*++=--::==::----==**",
    "                                              *++*+****++***#*++-:....=********+**++--:::---::-==+* ",
    "                                              *+=+*****+++++*++:::....:====--+*+++=-:::::.::--=++** ",
    "                                            ##**+==++++=++***++=:......---:..:----==--::::---=++**  ",
    "                                           %##**+======+++++**=---...........:-===----------==+**   ",
    "                                         ######**++=====++++++=-:::.........::--::---------==***    ",
    "                                     %%######***++=====+++++++===--:-......:-------------===+**     ",
    "                                 %%%%%%%%####*++++++====++====+====:::......::--:-------=====**     ",
    "                               %%%%%%%##%%##*****+++++========-===----:::....::--::----=-===+*#     ",
    "                              ###%#%###%###**+++++=+================-----::::-:-:-:-=---====+*#     ",
    "                             ###%%###%###%##**++=+++====+==---==+====--------:----:----=====+*#     ",
    "                            ####%######%%%##*++++========-==-======---===---:---:--=----=====*#     ",
    "                          ##############%%%****++=================--=======-=-:-=---========*#*     ",
    "                         ########**#**#######**++++++======-======--=-=--=====---=---========*##    ",
    "                        ######******#####%%##****++++====--=======-========-------==-=--=====+*     ",
    "                        #######*******###%####****++=====--======---=-=====--------==-----===***    ",
    "                       %#####*********######*##***++++=-=======---=-==--------------------==+#*#    ",
    "                      %#####******+***########***+*++*+=======--======-------------------===++##    ",
    "                     #####********#########*********++====+==--+===-----=----------------==+##      ",
    "                     #**#####*******#######**#*****+++++====--+==----:-==----------------==*#       ",
    "                    ##*####*****+++*#########*++****+++=+*+-=+=-------------------------==+**#      ",
    "                   ########*********#*#######*++++++++=+=+====--------=------------------=+*##      ",
    "                  ######*******+******#######**+++++++++=++*+=------------=-------------=+**        ",
    "                  ######******++++***#######*****=++++++++*+==----------===-----------==+*#*        ",
    "                 #########**+++++***#**###**#****+=++===++*+===------===+====--------===+*          ",
    "                 ###*#####****+++**+**#*##*******+++*+++++=+++=-----=-========------==+*##          ",
    "                 ***######*****+++*++*#**##****++++***+++*+++===-=-=--=========----===*##           ",
    "                 ###**#####**+++***+**#*##**+**+++++++++++++++===---=========------==**#            ",
    "                ###**#####***+++++++***####*++***+==+====++++++===--==-======------==*##            ",
    "                ###**#**##*****++++*+**#*#**++++*+*+++++=====------==========-----==+*##            ",
    "               **##***###**#*++++++++****#***++++*+++**+=---------=--=======----===+***             ",
    "               *********###****++++****#*#************+==--------==---======---===+**#              ",
    "              *****#+**####****++++****###**+***+**+*+=+=-=-----=-----====---====+***               ",
    "              *******+*+*####***********#*********#****==------==---====------==+###                ",
    "#%#           ***##*****++**###********##*********#**=++=-----===---====-----====+*#                ",
    "%%###         ****#*******+*##****+**+*###***++++***++==-----====---======--====+##                 ",
    "#####**       *******##*+****#%%*******##****+++++**+===------===--=======--===+**#                 ",
    "######*##     ***********+****######***###*********+====-----============-=-===+##                  ",
    "######************+****+*********####*#****+*+++++*+====-==-===================*#                   ",
    "#########**********+++++**#*+++*+************++**+++===------============--====*                    ",
    "###########*****#*++++++++++***+****##++***++++++======----=-=================+*                    ",
    "######***************++++++**********#*#**#*+==========---=====+==============*#                    ",
    "######*************++******+****+*****+*+++*+==========----===+++============+*                     ",
    " #####****#*********+++++++**********++*+++**===========---=+++++============+*                     ",
    "   #####******#*****++++++****++++++++++++****==========-===+***+============+*                     ",
    "     ######**##**#**+===+*******++*+++++++++**+========---==+***++===========+*                     ",
    "            ###**#***+++++++++*+***+++++++****#+=======---==+***++===========**                     ",
    "             ###*******++=+++++++++++++++****##*=======--===+***++==========+*                      ",
    "             %#********++=====+++*+***++*+++****+======--===+****++=========*                       ",
    "              ##***+***+++==========+++++++*+***+======--====****+++========                        ",
    "              ####****+*+*++===============++++**+======--==+****++========+                        ",
    "               %##*#*******++++++========+++++***+=======-==+*****++=======+                        ",
    "                %#**##*******+++++++===++=+++*****+==========*****+++======                         ",
    "                 ##*####*#**#***+++++==++++++******+++=======****#++=======                         ",
    "                  *****************++++++++*******+++++======+*****++======                         ",
    "                    #**********##***++++++++*******++++=======*****++======                         ",
    "                       ####%######****+************+++++======*###**+=======                        ",
    "                                 ####**************+++++======+####*+++======                       ",
    "                                    ##***********#*++++=======+###%#++++======++++++                ",
    "                                      ###****#****#+++++======      *+++=====++++=====              ",
    "                                          ###%#*###++++=======+      #*+===+++=========+            ",
    "                                              %####++++++======       **+=++++========++            ",
    "                                                 *++++++++++===         **+++++++=++++              ",
    "                                                 +++++++++++==+              *****                  ",
    "                                                *++*++++++=+==+                                     ",
    "                                                **#*+++=++=+++                                      ",
    "                                                ###*+*++++=*++                                      ",
    "                                                   #***++#+                                         ",
];
const CAT_LINE_BOUNDS = CAT_LINES.map((line) => {
    const first = line.search(/\S/);
    if (first === -1) return null;
    const last =
        line.length - 1 - line.split("").reverse().join("").search(/\S/);
    return { start: first, length: last - first + 1 };
});

function CatArt({ compact = false }: { compact?: boolean }) {
    const preRef = useRef<HTMLPreElement>(null);
    const waveRafRef = useRef<number | null>(null);
    const lastTouchTsRef = useRef(0);
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);
    const [wave, setWave] = useState<{
        row: number;
        col: number;
        progress: number;
    } | null>(null);

    useEffect(() => {
        return () => {
            if (waveRafRef.current !== null)
                cancelAnimationFrame(waveRafRef.current);
        };
    }, []);

    const triggerWave = (row: number, col: number) => {
        const bounds = CAT_LINE_BOUNDS[row];
        if (!bounds) return;

        const start = bounds.start;
        const end = bounds.start + bounds.length - 1;
        const clampedCol = Math.max(start, Math.min(end, col));

        if (waveRafRef.current !== null)
            cancelAnimationFrame(waveRafRef.current);

        const duration = compact ? 520 : 640;
        const t0 = performance.now();
        const animate = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            if (p < 1) {
                setWave({ row, col: clampedCol, progress: p });
                waveRafRef.current = requestAnimationFrame(animate);
            } else {
                setWave(null);
                waveRafRef.current = null;
            }
        };
        waveRafRef.current = requestAnimationFrame(animate);
    };

    const handleClick = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ) => {
        const rect = preRef.current?.getBoundingClientRect();
        if (!rect || rect.width <= 0 || rect.height <= 0) return;

        let clientX = 0;
        let clientY = 0;
        if ("touches" in e) {
            const t = e.touches[0];
            if (!t) return;
            clientX = t.clientX;
            clientY = t.clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const lineH = rect.height / CAT_LINES.length;
        const chW =
            rect.width / CAT_LINES.reduce((m, l) => Math.max(m, l.length), 0);
        const row = Math.max(
            0,
            Math.min(
                CAT_LINES.length - 1,
                Math.floor((clientY - rect.top) / lineH),
            ),
        );
        const col = Math.max(0, Math.floor((clientX - rect.left) / chW));
        const isTouch = "touches" in e;
        if (isTouch) {
            lastTouchTsRef.current = performance.now();
            setHoveredLine(null);
        } else {
            setHoveredLine(row);
        }
        triggerWave(row, col);
    };

    return (
        <div
            style={{
                position: "relative",
                overflowX: "hidden",
                overflowY: "hidden",
                userSelect: "none",
            }}
            onMouseLeave={() => setHoveredLine(null)}
            onMouseDown={handleClick}
            onTouchStart={handleClick}
        >
            <pre
                ref={preRef}
                className="cat-art"
                style={{
                    fontSize: compact ? "4.6px" : "7.1px",
                    lineHeight: compact ? "1.02" : "1.06",
                    display: "block",
                    margin: 0,
                }}
            >
                {CAT_LINES.map((line, li) => (
                    <div
                        key={li}
                        onMouseEnter={() => {
                            if (
                                performance.now() - lastTouchTsRef.current <
                                800
                            )
                                return;
                            setHoveredLine(li);
                        }}
                        style={{
                            height: "1.08em",
                            whiteSpace: "pre",
                            color:
                                hoveredLine === li
                                    ? "#FF6A6A"
                                    : "rgba(255,255,255,0.55)",
                            borderRadius: 2,
                            position: "relative",
                            transition: "color 120ms ease-out",
                        }}
                    >
                        {hoveredLine === li && CAT_LINE_BOUNDS[li] && (
                            <span
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    left: `${CAT_LINE_BOUNDS[li]!.start}ch`,
                                    width: `${CAT_LINE_BOUNDS[li]!.length}ch`,
                                    top: "12%",
                                    bottom: "12%",
                                    background: "rgba(221,58,58,0.08)",
                                    borderRadius: 2,
                                    pointerEvents: "none",
                                }}
                            />
                        )}
                        {wave &&
                            (() => {
                                const bounds = CAT_LINE_BOUNDS[li];
                                if (!bounds) return null;

                                const lineStart = bounds.start;
                                const lineEnd =
                                    bounds.start + bounds.length - 1;
                                const eased = wave.progress * wave.progress; // accelerating wave
                                const upMax = Math.max(0, wave.row);
                                const downMax = Math.max(
                                    0,
                                    CAT_LINES.length - 1 - wave.row,
                                );
                                const upRadius = upMax * eased;
                                const downRadius = downMax * eased;
                                const upThickness = compact ? 1.3 : 1.6;
                                const downThickness = compact ? 1.3 : 1.6;

                                const overlays: React.ReactNode[] = [];

                                // Up wave: horizontal band moving upward line by line.
                                const upDist = wave.row - li;
                                if (upDist >= 0) {
                                    const upDelta = Math.abs(upDist - upRadius);
                                    if (upDelta <= upThickness) {
                                        const upStrength =
                                            1 - upDelta / upThickness;
                                        overlays.push(
                                            <span
                                                key={`up-${li}`}
                                                aria-hidden="true"
                                                style={{
                                                    position: "absolute",
                                                    left: `${lineStart}ch`,
                                                    width: `${lineEnd - lineStart + 1}ch`,
                                                    top: "12%",
                                                    bottom: "12%",
                                                    background: `rgba(255,70,70,${0.14 + upStrength * 0.24})`,
                                                    borderRadius: 2,
                                                    pointerEvents: "none",
                                                }}
                                            />,
                                        );
                                    }
                                }

                                // Down wave: horizontal band moving downward line by line.
                                const downDist = li - wave.row;
                                if (downDist >= 0) {
                                    const downDelta = Math.abs(
                                        downDist - downRadius,
                                    );
                                    if (downDelta <= downThickness) {
                                        const downStrength =
                                            1 - downDelta / downThickness;
                                        overlays.push(
                                            <span
                                                key={`down-${li}`}
                                                aria-hidden="true"
                                                style={{
                                                    position: "absolute",
                                                    left: `${lineStart}ch`,
                                                    width: `${lineEnd - lineStart + 1}ch`,
                                                    top: "12%",
                                                    bottom: "12%",
                                                    background: `rgba(255,70,70,${0.14 + downStrength * 0.24})`,
                                                    borderRadius: 2,
                                                    pointerEvents: "none",
                                                }}
                                            />,
                                        );
                                    }
                                }

                                return overlays;
                            })()}
                        {line}
                    </div>
                ))}
            </pre>
        </div>
    );
}

/* ─── 2×2 contact card (no background) ──────────── */
interface ContactCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
}

function ContactCard({ icon, label, value, onClick, href }: ContactCardProps) {
    const inner = (
        <div
            className="v2-contact-card group flex flex-col items-start gap-3 p-5 cursor-pointer transition-colors duration-300 hover:bg-[#DD3A3A12]"
            onClick={onClick}
            style={{
                background: "rgba(221,58,58,0)",
            }}
        >
            <span
                className="v2-contact-icon text-3xl transition-colors duration-300 group-hover:text-[#DD3A3A]"
                style={{ color: "rgba(255,255,255,0.35)" }}
            >
                {icon}
            </span>
            <div>
                <div
                    className="text-xs uppercase tracking-[0.25em] mb-1 transition-colors duration-300 group-hover:text-[#DD3A3A]"
                    style={{
                        color: "rgba(255,255,255,0.28)",
                        fontFamily: "'Sora',sans-serif",
                    }}
                >
                    {label}
                </div>
                <div
                    className="text-sm font-semibold transition-colors duration-300 group-hover:text-[#FF5A5A]"
                    style={{
                        color: "rgba(255,255,255,0.82)",
                        fontFamily: "'Sora',sans-serif",
                    }}
                >
                    {value}
                </div>
            </div>
        </div>
    );

    if (href)
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline"
            >
                {inner}
            </a>
        );
    return <div>{inner}</div>;
}

/* ─── main ─────────────────────────────────────── */
export default function ContactV2() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const colLeft = useRef<HTMLDivElement>(null);
    const colRight = useRef<HTMLDivElement>(null);
    const [isCVOpen, setIsCVOpen] = useState(false);
    const [emailDisplay, setEmailDisplay] = useState(
        "hernandez.mathieu19@gmail.com",
    );

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const isMobile = window.matchMedia("(max-width: 1023px)").matches;

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => document.body.classList.add("v2-contact-active"),
                onEnterBack: () =>
                    document.body.classList.add("v2-contact-active"),
                onLeave: () =>
                    document.body.classList.remove("v2-contact-active"),
                onLeaveBack: () =>
                    document.body.classList.remove("v2-contact-active"),
            });

            // Cover transition: contact rises over projects while projects stay pinned behind.
            const previousSection = document.getElementById("v2-projects");
            if (previousSection) {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "top top",
                    pin: previousSection,
                    pinSpacing: false,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                });
            }

            gsap.fromTo(
                sectionRef.current,
                {
                    y: isMobile
                        ? Math.round(window.innerHeight * 0.16)
                        : Math.round(window.innerHeight * 0.22),
                },
                {
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                },
            );

            gsap.fromTo(
                contentRef.current,
                { opacity: 0.2, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 88%",
                        end: "top 58%",
                        scrub: true,
                    },
                },
            );
            gsap.fromTo(
                contentRef.current,
                { opacity: 1, y: 0 },
                {
                    opacity: 0.2,
                    y: -18,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "bottom 50%",
                        end: "bottom 10%",
                        scrub: true,
                    },
                },
            );

            gsap.fromTo(
                colLeft.current,
                { x: -40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: colLeft.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );
            gsap.fromTo(
                colRight.current,
                { x: 40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: colRight.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );
        }, sectionRef);

        return () => {
            ctx.revert();
            document.body.classList.remove("v2-contact-active");
        };
    }, []);

    const handleCopyEmail = () => {
        const email = "hernandez.mathieu19@gmail.com";
        navigator.clipboard.writeText(email);
        setEmailDisplay("E-mail copié !");
        setTimeout(() => setEmailDisplay(email), 1400);
    };

    return (
        <section
            id="v2-contact"
            ref={sectionRef}
            className="v2-section-shell relative min-h-screen flex flex-col justify-center overflow-hidden py-20 md:py-24"
            style={{
                background: "#120D0D",
                zIndex: 80,
                marginTop: CONTACT_OVERLAP,
            }}
        >
            <ContactGlyphBackground />

            <div ref={contentRef} className="relative z-20">
                {/* Mega title */}
                <div className="mb-16">
                    <GlitchTitle
                        text="Contact"
                        color="#DD3A3A"
                        triggerRef={sectionRef}
                        className="v2-mega-title"
                        style={{ color: "#DD3A3A" }}
                        startDesktop="top 84%"
                        startMobile="top 95%"
                    />
                </div>

                {/* Two-column layout */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
                    {/* Left: intro + 2×2 grid */}
                    <div ref={colLeft} className="flex-1 opacity-0">
                        <p
                            className="text-sm leading-relaxed mb-10 max-w-md"
                            style={{
                                color: "rgba(255,255,255,0.42)",
                                fontFamily: "'Sora',sans-serif",
                            }}
                        >
                            Disponible pour opportunités, collaborations ou
                            simplement échanger.
                        </p>

                        <div className="v2-contact-grid grid grid-cols-1 sm:grid-cols-2 gap-0">
                            <ContactCard
                                icon={<FaEnvelope />}
                                label="E-mail"
                                value={emailDisplay}
                                onClick={handleCopyEmail}
                            />
                            <ContactCard
                                icon={<FaLinkedin />}
                                label="LinkedIn"
                                value="Mathieu Hernandez"
                                href="https://www.linkedin.com/in/mathieu-hernandez-dev/"
                            />
                            <ContactCard
                                icon={<FaGithub />}
                                label="GitHub"
                                value="thameiu"
                                href="https://github.com/thameiu"
                            />
                            <ContactCard
                                icon={<FaFileDownload />}
                                label="CV"
                                value="Télécharger mon CV"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    requestAnimationFrame(() =>
                                        setIsCVOpen(true),
                                    );
                                }}
                            />
                        </div>

                        {/* Footer meta moved here */}
                        <div
                            className="mt-10 pt-6 flex flex-row items-center justify-between gap-4 sm:gap-6"
                            style={{
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <p
                                className="text-xs"
                                style={{
                                    color: "rgba(255,255,255,0.2)",
                                    fontFamily: "'Sora', sans-serif",
                                }}
                            >
                                © {new Date().getFullYear()} Mathieu Hernandez
                            </p>
                            <div
                                className="flex items-center"
                                style={{ minHeight: "0.75rem" }}
                            >
                                <Image
                                    src="/MH_light.png"
                                    alt="MH"
                                    width={31}
                                    height={6}
                                    className="w-auto h-[6px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: ASCII cat */}
                    <div
                        ref={colRight}
                        className="flex-shrink-0 opacity-0 hidden lg:flex flex-col items-end lg:-mt-64"
                    >
                        <CatArt />
                    </div>
                </div>

                <div className="mt-10 lg:hidden">
                    <div style={{ opacity: 0.8 }}>
                        <CatArt compact />
                    </div>
                </div>

                <div className="v2-contact-cutelinks mt-6">
                    <CuteLinks longer />
                </div>
            </div>

            {isCVOpen && <CVModal onClose={() => setIsCVOpen(false)} />}
        </section>
    );
}
