import {
  TweetMeta,
  TwitterTimelineMeta,
  TwitterTokenResponse,
} from '@/lib/types/twitter.types';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  catchError,
  firstValueFrom,
  map,
  of,
  switchMap,
  from,
  tap,
  filter,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { Client, auth } from 'twitter-api-sdk';

const TOKEN_URL = `https://${process.env.TWITTER_API_KEY}:${process.env.TWITTER_API_SECRET}@api.twitter.com/oauth2/token?grant_type=client_credentials`;

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'GET') {
    return response.status(405);
  }

  if (process.env.TWITTER_API_ENABLED === 'true') {
    const $timeline = (token: string) => {
      const authClient = new auth.OAuth2Bearer(token);
      const client = new Client(authClient);

      return from(
        client.tweets.usersIdTweets(process.env.TWITTER_USER_ID ?? '', {
          'tweet.fields': ['created_at', 'public_metrics'],
          'user.fields': ['username', 'profile_image_url'],
          expansions: ['author_id'],
          max_results: 5,
        })
      ).pipe(
        filter((timelineResponse) => !!timelineResponse),
        map((timelineResponse) => {
          // filter out tweets that are responses to other tweets, don't care about those for now
          const tweets = timelineResponse.data!.map(
            (tweetMeta) =>
              ({
                id: tweetMeta.id,
                text: tweetMeta.text,
                createdAt: tweetMeta.created_at ?? '',
              } as TweetMeta)
          );

          // map the timeline response, flattening out tweets and profile information
          const meta: TwitterTimelineMeta = {
            tweets: tweets.slice(0, 3),
            profileMeta: {
              image:
                timelineResponse.includes!.users![0].profile_image_url ?? '',
              name: timelineResponse.includes!.users![0].name,
              username: timelineResponse.includes!.users![0].username,
            },
          };

          return meta;
        })
      );
    };

    const $authentication = fromFetch<TwitterTokenResponse>(TOKEN_URL, {
      method: 'POST',
      selector: (authenticationApiResponse) => authenticationApiResponse.json(),
    }).pipe(
      map((authenticationResponse) => authenticationResponse.access_token),
      switchMap($timeline),
      map((meta) => response.status(200).json(meta)),
      catchError((error) => {
        console.error(error);
        return of(
          response.status(500).json({
            error: error.toString(),
          })
        );
      })
    );

    return firstValueFrom($authentication);
  }

  return response.status(200).json({
    message: 'timeline successful',
  });
}
