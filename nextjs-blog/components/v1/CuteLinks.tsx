import Image from 'next/image';
import Link from 'next/link';

export default function CuteLinks() {

    const CuteLink = ({ href, src, alt, borderColor=null }: { href?: string; src: string; alt: string , borderColor?:string}) => (
      href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer" className='transition-all md:hover:-translate-y-1'>
            <img 
            src={src} 
            alt={alt} 
            width={80} 
            height={31} 
            className='transition-all rounded border w-[68px] h-auto md:w-[80px] md:h-5'
            style={{ borderColor: borderColor || 'transparent' }}
            />
        </Link>
      ) : (
        <div className='transition-all md:hover:-translate-y-1'>
            <img 
            src={src} 
            alt={alt} 
            width={80} 
            height={20} 
            className='transition-all rounded w-[68px] h-auto md:w-[80px] md:h-5'
            style={{ borderColor: borderColor || 'transparent' }}
            />
        </div>
      )
    );

    return (
        <div className="w-full max-w-[95vw] md:max-w-4xl mx-auto flex flex-wrap justify-center md:justify-start items-center gap-2 pt-4 px-4 md:px-0">
          <CuteLink href="/chat" src="/thameiu.webp" alt="chat" borderColor="var(--color-accent)" />
          <CuteLink href="https://www.axelmanguian.fr" src="/axelmanguian.webp" alt="Axel Manguian" borderColor="#066767" />
          <CuteLink href="https://soundcloud.com/mydriax" src="/mydriax.gif" alt="Stream Mydriax" borderColor="#24004C" />
          <CuteLink href="https://ergosix-rc.vercel.app/" src="/ergosix.webp" alt="Ergosix Recrutement" borderColor="#3D6D2D" />
          <CuteLink href="https://react-icons.github.io/react-icons/" src="/react-icons.gif" alt="React Icons" borderColor="#E91E63" />
          <CuteLink href="https://github.com/timothygebhard/js-colormaps" src="/jscolormaps.webp" alt="JS Colormaps by timothygebhard on GitHub" borderColor="#" />
          <CuteLink href="https://www.pdf24.org/fr/" src="/pdf24.webp" alt="Download PDF24" borderColor="#67B1FF" />
          <CuteLink href="https://temp-mail.org/" src="/tempmail.webp" alt="Temp Mail" borderColor="#00C497" />
          <CuteLink href="https://bitoduc.fr/" src="/bitoduc.gif" alt="Bitoduc.fr, référence littéraire pour développeurs"/>
          <CuteLink href="https://in.tern.et/products/winrar-archive-messenger-bag-prod" src="https://cyber.dabamos.de/88x31/winrar4.gif" alt="Cool Winrar Bag"  />
          <CuteLink href="https://in.tern.et/products/r4-messenger-bag-tern%C2%AE-bundle" src="/R4.webp" alt="Very Cool R4 Bag" borderColor="#AAAAAA" />
          {/* <CuteLink href="https://davrilsupply.com/" src="/davrilsupply.webp" alt="DAVRILSUPPLY" borderColor="#FFFFFF" /> */}
          <CuteLink href="https://dyskinesiaa.com/" src="/dyskinesiaa.webp" alt="Check out dyskinesiaa" borderColor="#000000" />
          <CuteLink src="https://cyber.dabamos.de/88x31/hasmile.gif" alt="Smile !" />
          <CuteLink src="https://cyber.dabamos.de/88x31/rainbow_bev.gif" alt="Love is love" />
          {/* TODO : EZGif, Ile.a.gammes, Bruno */}
      </div>
    )
}