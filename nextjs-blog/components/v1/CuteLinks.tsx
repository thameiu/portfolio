import Image from 'next/image';
import Link from 'next/link';

export default function CuteLinks({longer=false}) {

    const CuteLink = ({ href, src, alt, borderColor=null }: { href?: string; src: string; alt: string , borderColor?:string}) => (
      href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer" className='transition-all md:hover:-translate-y-1'>
            <Image
              src={src}
              alt={alt}
              width={80}
              height={31}
              quality={55}
              sizes="(max-width: 768px) 68px, 80px"
              className='transition-all  border w-[68px] h-auto md:w-[80px] md:h-5'
              style={{ borderColor: borderColor || 'transparent' }}
            />
        </Link>
      ) : (
        <div className='transition-all md:hover:-translate-y-1'>
            <Image
              src={src}
              alt={alt}
              width={80}
              height={20}
              quality={55}
              sizes="(max-width: 768px) 68px, 80px"
              className='transition-all border w-[68px] h-auto md:w-[80px] md:h-5'
              style={{ borderColor: borderColor || 'transparent' }}
            />
        </div>
      )
    );

    return (
        <div className={`w-full ${longer?'bg-red':'max-w-[95vw] md:max-w-4xl'} mx-auto flex flex-wrap justify-center md:justify-start items-center gap-2 pt-4 px-4 md:px-0`}>
          <CuteLink href="/chat" src="/thameiu.webp" alt="chat" borderColor="#881111" />
          <CuteLink href="https://16ur.vercel.app" src="/16ur.gif" alt="Axel Manguian" borderColor="#066767" />
          <CuteLink href="https://soundcloud.com/mydriax" src="/mydriax.gif" alt="Stream Mydriax" borderColor="#24004C" />
          <CuteLink href="https://ergosix-rc.vercel.app/" src="/ergosix.webp" alt="Ergosix Recrutement" borderColor="#3D6D2D" />
          {/*<CuteLink href="https://github.com/timothygebhard/js-colormaps" src="/jscolormaps.webp" alt="JS Colormaps by timothygebhard on GitHub" />*/}
          <CuteLink href="https://zed.dev" src="/zed.gif" alt="Zed IDE supremacy" borderColor="#5b86e9" />
          <CuteLink href="https://in.tern.et/products/r4-messenger-bag-tern%C2%AE-bundle" src="/R4.webp" alt="Very Cool R4 Bag" borderColor="#AAAAAA" />

          <CuteLink src="https://cyber.dabamos.de/88x31/hasmile.gif" alt="Smile !" />
          <CuteLink src="https://cyber.dabamos.de/88x31/rainbow_bev.gif" alt="Love is love" />
          {/* TODO : EZGif, Ile.a.gammes, Bruno */}
      </div>
    )
}
