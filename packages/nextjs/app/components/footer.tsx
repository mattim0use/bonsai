import Image from 'next/image';
import Link from 'next/link';

type FooterLinkProps = {
  href: string;
  text: string;
};

const FooterLink = ({ href, text }: FooterLinkProps) => (
  <Link
    target="_blank"
    href={href}
    style={{ boxShadow: '0px 12px 36px 0px rgba(0, 199, 255, 0.50)' }}
    className="flex bg-accent text-white text-xl justify-center items-center gap-2 py-4 rounded-full shadow-primary px-3 lg:px-5 txt-m hover:scale-105 transition-transform duration-300 ease-in-out"
  >
    <p>{text}</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M5 1.771H3.25C2.00736 1.771 1 2.77835 1 4.02098V11.521C1 12.7636 2.00736 13.771 3.25 13.771H10.75C11.9926 13.771 13 12.7636 13 11.521V9.271M9.24963 1.77118L13 1.771M13 1.771V5.14607M13 1.771L6.62445 8.14578"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Link>
);

export default function Footer() {
  return (
    <div className="py-16 px-3 lg:px-6 flex flex-col gap-16 max-w-screen relative z-50">
      <div className="grid grid-cols-2 gap-2 lg:gap-6">
        {/* <FooterLink href="/" text="Enjoy Zora" /> */}
        <FooterLink href="https://twitter.com/enjoytech_" text="!!! Twitter" />
        <FooterLink
          href="https://warpcast.com/~/channel/enjoy"
          text="!!! Warpcast"
        />
      </div>
      <div className="text-accent text-center max-w-2xl mx-auto text-2xl tracking-96 w-full">
        $Enjoy is not owned, managed or controlled by Zora Labs or any of their
        respective principals or affiliates. $enjoy tokens are intended as
        collectible items for individual enjoyment only, not for investment
        purposes.
      </div>
      <Image
        alt="logo"
        src="/logo.png"
        height={52}
        width={52}
        className="mx-auto"
      />
      <div className="px-3 lg:p-9 grid grid-cols-1 lg:grid-cols-4">
        <div>
          <img src="/memes/enjoyoor-onchain 1.jpg" />
          <img src="/memes/escape-the-matrix 1.jpg" />
          <img src="/memes/hello-irs 1.jpg" />
          <img src="/memes/fighting-fudders 1.jpg" />
          <img src="/memes/i-should-enjoy 1.jpg" />
        </div>
        <div>
          <img src="/memes/who-up-zorb 1.jpg" />
          <img src="/memes/3-dragons.jpg" />
          <img src="/memes/token-enjoyoo 1.jpg" />
          <img src="/memes/coincidence-2 1.jpg" />
        </div>
        <div>
          <img src="/memes/everybody-gangsta 1.jpg" />
          <img src="/memes/fud-or-25 1.jpg" />
          <img src="/memes/fud-or-25 1.jpg" />
          <img src="/memes/100-percent-enjoyoor.jpg" />
        </div>
        <div>
          <img src="/memes/tokenfudder 1.jpg" />
          <img src="/memes/coincidence- 1.jpg" />
          <img src="/memes/wario-zorb 1.jpg" />
        </div>
      </div>
    </div>
  );
}
