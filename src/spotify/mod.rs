#[cfg(feature = "ssr")]
pub mod client;
pub mod responses;

use serde::Serialize;

use self::responses::SpotifyNowPlayingResponse;

/// The response type we'll marshal and send back to the UI, transforming properties to more common JS-camel case for sanity.
#[derive(Serialize, Clone, Debug, Default)]
#[serde(rename_all = "camelCase")]
pub struct SpotifyTracking {
    pub href: String,
    pub album_image_src: String,
    pub track_title: String,
    pub artist: String,
    pub now_playing: bool,
}

impl SpotifyTracking {
    pub fn new(
        href: String,
        album_image_src: String,
        track_title: String,
        artist: String,
    ) -> SpotifyTracking {
        Self {
            href,
            album_image_src,
            track_title,
            artist,
            now_playing: true,
        }
    }
}

/// Maps the raw Spotify response into the expected UI response.
impl From<SpotifyNowPlayingResponse> for SpotifyTracking {
    fn from(now_playing: SpotifyNowPlayingResponse) -> Self {
        // Most of the linking and track/show information come from the `item` and `context` node and we can largely ignore the majority of the response
        let item = now_playing.item;
        let context = now_playing.context;
        let track_title = item.name;
        let href = context.external_urls.spotify;

        // The playing type will either be `"show"` or `"track"` based on a podcast or artist song
        // There's _a lot_ of presumptive `unwrap()`ing going here, should probably clean up eventually
        if now_playing.currently_playing_type.eq("track") {
            let album_image = item.album.as_ref().unwrap().images.first().unwrap();
            let artist = item
                .artists
                .unwrap()
                .first()
                .unwrap()
                .to_owned()
                .name
                .clone();

            Self::new(href, album_image.url.to_string(), track_title, artist)
        } else {
            let show = item.show.as_ref().unwrap();
            let show_image = show.images.first().unwrap();
            let show_title = show.name.clone();

            Self::new(href, show_image.url.to_string(), track_title, show_title)
        }
    }
}