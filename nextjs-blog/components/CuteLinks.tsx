import Image from 'next/image';
import Link from 'next/link';

export default function CuteLinks() {

    const CuteLink = ({ href, src, alt, borderColor }: { href: string; src: string; alt: string , borderColor:string}) => (
        <Link href={href} target="_blank" rel="noopener noreferrer" className='transition-all hover:-translate-y-1'>
            <Image 
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
 
      </div>
    )
}