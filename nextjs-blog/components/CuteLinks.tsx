import Image from 'next/image';
import Link from 'next/link';

export default function CuteLinks() {

    const CuteLink = ({ href, src, alt, borderColor }: { href: string; src: string; alt: string , borderColor:string}) => (
      href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer" className='transition-all md:hover:-translate-y-1'>
            <img 
            src={src} 
            alt={alt} 
            width={80} 
            height={20} 
            className='transition-all rounded border w-[68px] h-auto md:w-[80px] md:h-5'
            style={{ borderColor }}
            />
        </Link>
      ) : (
        <div className='transition-all md:hover:-translate-y-1'>
            <img 
            src={src} 
            alt={alt} 
            width={80} 
            height={20} 
            className='transition-all rounded border w-[68px] h-auto md:w-[80px] md:h-5'
            style={{ borderColor }}
            />
        </div>
      )
    );

    return (
    <div className="w-full max-w-[95vw] md:max-w-4xl mx-auto grid grid-cols-4 place-items-center md:flex md:flex-row md:flex-wrap md:items-center md:justify-start gap-2 pt-4 px-4 md:px-0">
          <CuteLink href="/chat" src="/thameiu.webp" alt="chat" borderColor="var(--color-accent)" />
          <CuteLink href="https://www.axelmanguian.fr" src="/axelmanguian.webp" alt="Axel Manguian" borderColor="#066767" />
          <CuteLink href="https://ergosix-rc.vercel.app/" src="/ergosix.webp" alt="Ergosix Recrutement" borderColor="#3D6D2D" />
          <CuteLink href="https://react-icons.github.io/react-icons/" src="/react-icons.gif" alt="React Icons" borderColor="#E91E63" />
          <CuteLink href="https://www.pdf24.org/fr/" src="/pdf24.webp" alt="Download PDF24" borderColor="#67B1FF" />
          <CuteLink href="https://temp-mail.org/" src="/tempmail.webp" alt="Temp Mail" borderColor="#00C497" />
          <CuteLink href="https://in.tern.et/products/winrar-archive-messenger-bag-prod" src="https://cyber.dabamos.de/88x31/winrar4.gif" alt="Winrar Bag" borderColor="#" />
          <CuteLink href="https://dyskinesiaa.com/" src="/dyskinesiaa.webp" alt="Check out dyskinesiaa" borderColor="#000000" />
          <CuteLink href="" src="https://cyber.dabamos.de/88x31/rainbow_bev.gif" alt="Love is love" borderColor="#" />
      </div>
    )
}