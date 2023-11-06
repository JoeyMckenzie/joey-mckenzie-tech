// TODO: One of these I'm gonna figure out how to use the Spotify TS SDK, though that day is not today...

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} from '$env/static/private';
import type { AccessTokenResponse, SpotifyNowPlayingResponse } from './types';

const NOW_PLAYING_URL =
  'https://api.spotify.com/v1/me/player?type=track,episode';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export type NowPlayingResponse = {
  nowPlaying: boolean;
  albumImageSrc?: string;
  artist?: string;
  href?: string;
  trackTitle?: string;
};

export async function getSpotifyNowPlaying(): Promise<NowPlayingResponse> {
  const defaultResponse = {
    nowPlaying: false,
  };

  try {
    const accessTokenResponse = await fetch(TOKEN_URL, {
      method: 'POST',
      body: getRequestBody(SPOTIFY_REFRESH_TOKEN),
      headers: getHeaders(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
    });
    const accessToken: AccessTokenResponse = await accessTokenResponse.json();
    const nowPlayingResponse = await fetch(NOW_PLAYING_URL, {
      method: 'GET',
      headers: {
        Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
      },
    });

    // Spotify returned a 204, so no content === not playing anything
    if (nowPlayingResponse.status === 204 || !nowPlayingResponse.ok) {
      return defaultResponse;
    }

    const nowPlaying: SpotifyNowPlayingResponse =
      await nowPlayingResponse.json();

    // Most of the linking and track/show information come from the `item` and `context` node and we can largely ignore the majority of the response
    const item = nowPlaying.item;
    const context = nowPlaying.context;
    const trackTitle = item.name;
    const href =
      item.external_urls?.spotify ?? context?.external_urls?.spotify ?? '/';

    // The playing type will either be `"show"` or `"track"` based on a podcast or artist song
    // There's _a lot_ of presumptive `unwrap()`ing going here, should probably clean up eventually
    if (nowPlaying.currently_playing_type === 'track') {
      const albumImage = item.album.images[0];
      const artist = item.artists[0].name;

      return {
        albumImageSrc: albumImage.url,
        artist,
        href,
        trackTitle,
        nowPlaying: true,
      };
    } else {
      const show = item.show;
      const showImage = show.images[0];
      const showTitle = show.name;

      return {
        albumImageSrc: showImage.url,
        artist: showTitle,
        href,
        trackTitle,
        nowPlaying: true,
      };
    }
  } catch (e) {
    console.error('error retrieving spotify now playing', e);
    return defaultResponse;
  }
}

function getHeaders(clientId: string, clientSecret: string) {
  return {
    Authorization:
      'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    Accept: 'application/json',
  };
}

function getRequestBody(refreshToken: string) {
  return new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
}
