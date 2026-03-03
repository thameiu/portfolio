import Image from 'next/image';
import Link from 'next/link';

export default function CuteLinks() {

    const CuteLink = ({ href, src, alt, borderColor }: { href: string; src: string; alt: string , borderColor:string}) => (
        <Link href={href} target="_blank" rel="noopener noreferrer" className='transition-all md:hover:-translate-y-1'>
            <img 
            src={src} 
            alt={alt} 
            width={80} 
            height={20} 
            className='transition-all rounded border'
            style={{ borderColor }}
            />
        </Link>
        );

    return (



      <div className="w-full max-w-[95vw] md:max-w-4xl flex flex-row items-center justify-start gap-2 pt-4 px-4 md:px-0">
        <CuteLink href="/chat" src="/badge.webp" alt="chat" borderColor="var(--color-accent)" />
        <CuteLink href="https://www.axelmanguian.fr" src="/axelmanguian.webp" alt="Axel Manguian" borderColor="#066767" />
        <CuteLink href="https://ergosix-rc.vercel.app/" src="/ergosix.webp" alt="Ergosix Recrutement" borderColor="#3D6D2D" />
        <CuteLink href="https://in.tern.et/products/winrar-archive-messenger-bag-prod" src="https://cyber.dabamos.de/88x31/winrar4.gif" alt="Winrar Bag" borderColor="#" />
        <CuteLink href="https://www.pdf24.org/fr/" src="/pdf24.webp" alt="Download PDF24" borderColor="#67B1FF" />
        <CuteLink href="https://dyskinesiaa.com/" src="/dyskinesiaa.webp" alt="Check out dyskinesiaa" borderColor="#000000" />
 
      </div>
    )
}