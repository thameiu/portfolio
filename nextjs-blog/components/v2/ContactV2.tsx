"use client";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CVModal from "../v1/CVModal";

const CONTACT_OVERLAP = 650;

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
"                                                   #***++#+                                         "
];

/* Cat art is 91 lines × ~122 chars.  At 5.5 px / char the block is ≈ 450×590 px — fits a right column comfortably. */
function CatArt() {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  return (
    <div
      style={{ position: "relative", overflowX: "hidden", overflowY: "hidden", userSelect: "none" }}
      onMouseLeave={() => setHoveredLine(null)}
    >
      {hoveredLine !== null && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -14,
            top: hoveredLine * 11.8 + 6,
            width: 14,
            height: 14,
            borderRadius: 2,
            border: "1px solid rgba(221,58,58,0.95)",
            background: "rgba(221,58,58,0.12)",
            boxShadow: "0 0 0 3px rgba(221,58,58,0.05)",
            pointerEvents: "none",
            transition: "top 110ms ease, opacity 110ms ease",
          }}
        />
      )}

      <pre
        className="cat-art"
        style={{
          fontSize: "7.1px",
          lineHeight: "1.06",
          display: "block",
        }}
      >
        {CAT_LINES.map((line, li) => (
          <div
            key={li}
            onMouseEnter={() => setHoveredLine(li)}
            style={{
              height: "1.08em",
              whiteSpace: "pre",
              color: hoveredLine === li ? "#FF6A6A" : "rgba(255,255,255,0.55)",
              background: hoveredLine === li ? "rgba(221,58,58,0.05)" : "transparent",
              borderRadius: 2,
              transition: "color 120ms ease-out",
            }}
          >
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
          style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Sora',sans-serif" }}
        >
          {label}
        </div>
        <div
          className="text-sm font-semibold transition-colors duration-300 group-hover:text-[#FF5A5A]"
          style={{ color: "rgba(255,255,255,0.82)", fontFamily: "'Sora',sans-serif" }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  if (href)
    return <a href={href} target="_blank" rel="noopener noreferrer" className="block no-underline">{inner}</a>;
  return <div>{inner}</div>;
}

/* ─── main ─────────────────────────────────────── */
export default function ContactV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const colLeft    = useRef<HTMLDivElement>(null);
  const colRight   = useRef<HTMLDivElement>(null);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [emailDisplay, setEmailDisplay] = useState("hernandez.mathieu19@gmail.com");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;

      gsap.fromTo(
        sectionRef.current,
        { y: isMobile ? 90 : 140 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(titleRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 85%", end: "top 40%", scrub: 0.6 } }
      );
      gsap.fromTo(colLeft.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: colLeft.current, start: "top 80%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(colRight.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: colRight.current, start: "top 80%", toggleActions: "play none none none" } }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24"
      style={{ background: "#120D0D", zIndex: 80, marginTop: -CONTACT_OVERLAP }}
    >


      {/* Mega title */}
      <div className="px-[8vw] mb-16">
        <h2
          ref={titleRef}
          className="v2-mega-title opacity-0"
          style={{ color: "#DD3A3A" }}
        >
          Contact
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="px-[8vw] flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

        {/* Left: intro + 2×2 grid */}
        <div ref={colLeft} className="flex-1 opacity-0">
          <p
            className="text-sm leading-relaxed mb-10 max-w-md"
            style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'Sora',sans-serif" }}
          >
            Disponible pour opportunités, collaborations ou simplement échanger.
          </p>

          {/* 2×2 grid — no backgrounds */}
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
              href="https://www.linkedin.com/in/mathieu-hernandez-306914264/"
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
                requestAnimationFrame(() => setIsCVOpen(true));
              }}
            />
          </div>

          {/* Footer meta moved here */}
          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Sora', sans-serif" }}
            >
              © {new Date().getFullYear()} Mathieu Hernandez
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Sora', sans-serif" }}
            >
              PORTFOLIO - v2
            </p>
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

      {isCVOpen && <CVModal onClose={() => setIsCVOpen(false)} />}
    </section>
  );
}
