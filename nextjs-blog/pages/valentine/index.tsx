import Head from 'next/head';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import 'animate.css';


export default function Valentine() {
  const [showLove, setShowLove] = useState(false);const [noButtonStyle, setNoButtonStyle] = useState({
  transition: 'all 0.3s ease-out',
  position: 'relative' as const,
} as any);
  const [clickCount, setClickCount] = useState(0);
  // Memoize hearts so they don't re-render on state changes
  const hearts = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${5 + Math.random() * 5}s`
    })),
    []
  );

  const moveNoButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount(prev => prev + 1);
    
    // Get the button's current position on screen
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = rect.left;
    const currentY = rect.top;
    
    const maxX = window.innerWidth - 200; // button width approximation
    const maxY = window.innerHeight - 80; // button height approximation
    
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;
    
    // Make sure the new position is different from current
    while (Math.abs(randomX - currentX) < 100 && Math.abs(randomY - currentY) < 100) {
      randomX = Math.random() * maxX;
      randomY = Math.random() * maxY;
    }

    // If this is the first move (position is still relative), set it to fixed at current position first
    if (noButtonStyle.position === 'relative') {
      // First, set the button to its current absolute position with fixed positioning
      setNoButtonStyle({
        position: 'fixed',
        left: `${currentX}px`,
        top: `${currentY}px`,
        transition: 'none', // No transition for this initial positioning
      });
      
      // Then, immediately after, move it to the new position with transition
      setTimeout(() => {
        setNoButtonStyle({
          position: 'fixed',
          left: `${randomX}px`,
          top: `${randomY}px`,
          transition: 'all 0.3s ease-out',
        });
      }, 10);
    } else {
      // Normal move for subsequent clicks
      setNoButtonStyle({
        position: 'fixed',
        left: `${randomX}px`,
        top: `${randomY}px`,
        transition: 'all 0.3s ease-out',
      });
    }
  };

  return (
    <>
      <Head>
        <title>St-Valentin</title>
        <link rel="icon" href="/valentine/heart.png" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-pink-300 flex items-center justify-center overflow-hidden relative">
        {/* Animated hearts background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute text-4xl opacity-80 animate-float-up"
              style={{
                left: heart.left,
                animationDelay: heart.animationDelay,
                animationDuration: heart.animationDuration,
                bottom: '-50px'
              }}
            >
              <Image
                src="/valentine/heart.png"
                alt="Heart"
                width={40}
                height={40}
                className="text-red-500"
              />
            </div>
          ))}
        </div>

        {/* Center question box */}
        <div className="bg-white p-12 rounded-[30px] shadow-2xl text-center z-10 animate__animated animate__fadeIn">
        {clickCount >= 5 ?
          <Image
            src="/valentine/valentineangry.png"
            alt="Moi hihi..."
            width={300}
            height={300}
            className="mx-auto mb-6 animate__animated animate__pulse animate__infinite"
          />
          :
          <Image
            src="/valentine/moi2.png"
            alt="Moi hihi..."
            width={300}
            height={300}
            className="mx-auto mb-6 animate__animated animate__pulse animate__infinite"
          />
        }
          <h1 className="text-3xl font-bold text-red-600 mb-8 font-['cedarville-cursive-regular']">
            Chère Lexane, veux-tu être ma valentine ?
          </h1>
          <div className="flex gap-8 justify-center">
            <button 
              onClick={() => setShowLove(true)}
              className="px-12 py-4 text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-pink-400/50  font-['cedarville-cursive-regular']"
            >
              Oui
            </button>
            <button  style={noButtonStyle} onClick={clickCount<9 ? moveNoButton : e => e.currentTarget.classList.add("animate__animated","animate__hinge")} className="px-12 py-4 text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-red-400/50  font-['cedarville-cursive-regular']">
              Non 
            </button>
            {/* onClick={e => e.currentTarget.classList.add("animate__animated","animate__hinge")} */}
          </div>
        </div>
        {showLove && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-500 animate-grow-fullscreen">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['cedarville-cursive-regular'] text-white animate__animated animate__fadeIn px-4 text-center">
              Je t'aime <Image src="/valentine/heart.png" alt="Heart" width={30} height={30} className="inline-block" />
            </h1>
          </div>
        )}

        <style jsx>{`
          @keyframes float-up {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.8;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-120vh) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes grow-button {
            0% {
              transform: translate(-50%, -50%) scale(1);
              border-radius: 50px;
              top: 50%;
              left: 50%;
              background-color: transparent;
            }
            100% {
              transform: translate(-50%, -50%) scale(5);
              border-radius: 0%;
              top: 50%;
              left: 50%;
              background-color: rgb(236, 72, 153);
            }
          }

          .animate-float-up {
            animation: float-up 10s infinite ease-in;
          }

          .animate-grow-button {
            animation: grow-button 1.5s ease-out forwards;
          }

          .animate-grow-fullscreen {
            animation: grow-button 1.5s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
}