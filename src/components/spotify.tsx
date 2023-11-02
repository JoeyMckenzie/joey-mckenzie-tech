import { NowPlayingResponse } from '@/lib/spotify';
import Image from 'next/image';
import { Suspense } from 'react';

function NotPlaying({
  text = 'Not currently listening',
  children,
}: {
  text?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex flex-row items-center justify-center space-x-2">
        {children}
        <div className="flex flex-col">
          <h4 className="text-xs text-neutral-500">{text}</h4>
        </div>
      </div>
    </div>
  );
}

async function CurrentlyPlaying({
  nowPlaying,
  children,
}: {
  nowPlaying: NowPlayingResponse;
  children: React.ReactNode;
}) {
  return nowPlaying.nowPlaying ? (
    <a
      href={nowPlaying.href}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col space-y-1"
    >
      <h2 className="font-ubuntu inline-flex justify-center text-xs">
        Now listening
      </h2>
      <div className="flex flex-row items-center justify-center space-x-2">
        {children}
        <Image
          src={nowPlaying.albumImageSrc!}
          width="30"
          height="30"
          alt="Spotify listenting to"
          className="rounded-sm"
        />
        <div className="flex max-w-[16rem] flex-col">
          <h4 className="line-clamp-1 overflow-hidden text-ellipsis text-xs font-semibold">
            {nowPlaying.trackTitle}
          </h4>
          <p className="text-xs">{nowPlaying.artist}</p>
        </div>
      </div>
    </a>
  ) : (
    <NotPlaying>{children}</NotPlaying>
  );
}

export function NowPlaying({
  nowPlaying,
  children,
}: {
  nowPlaying: NowPlayingResponse;
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<NotPlaying text="Loading...">{children}</NotPlaying>}>
      <CurrentlyPlaying nowPlaying={nowPlaying}>{children}</CurrentlyPlaying>
    </Suspense>
  );
}
