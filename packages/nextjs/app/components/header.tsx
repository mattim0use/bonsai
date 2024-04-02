'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-between p-6 relative z-50">
      <Link href="/">
        <Image alt="logo" src="/logo.png" height={64} width={64} />
      </Link>
      <div className="flex gap-3">
        <Link
          target="_blank"
          href="https://bridge.zora.energy/"
          className="flex text-accent bg-white text-xl justify-center items-center p-2 rounded-full shadow-primary w-36 gap-2 h-12 tracking-96 hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <span>Zora Bridge</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M5 1H3.25C2.00736 1 1 2.00735 1 3.24999V10.75C1 11.9926 2.00736 13 3.25 13H10.75C11.9926 13 13 11.9926 13 10.75V8.5M9.24963 1.00018L13 1M13 1V4.37507M13 1L6.62445 7.37478"
              stroke="#03C7FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link
          target="_blank"
          href="https://relay.link/bridge/zora/"
          className="flex text-accent bg-white text-xl justify-center items-center p-2 rounded-full shadow-primary w-36 gap-2 h-12 tracking-96 hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <span>Relay Bridge</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M5 1H3.25C2.00736 1 1 2.00735 1 3.24999V10.75C1 11.9926 2.00736 13 3.25 13H10.75C11.9926 13 13 11.9926 13 10.75V8.5M9.24963 1.00018L13 1M13 1V4.37507M13 1L6.62445 7.37478"
              stroke="#03C7FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link
          target="_blank"
          href="https://explorer.zora.energy/address/0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39"
          className="flex text-accent bg-white text-xl justify-center items-center p-2 rounded-full shadow-primary w-40 gap-2 h-12 tracking-96 hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <span>Enjoy Contract</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M5 1H3.25C2.00736 1 1 2.00735 1 3.24999V10.75C1 11.9926 2.00736 13 3.25 13H10.75C11.9926 13 13 11.9926 13 10.75V8.5M9.24963 1.00018L13 1M13 1V4.37507M13 1L6.62445 7.37478"
              stroke="#03C7FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
