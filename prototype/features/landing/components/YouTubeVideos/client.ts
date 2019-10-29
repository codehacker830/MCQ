const googleYouTubeApiKey = "AIzaSyBuXvoYSLHTQcm_-kNNYbMnUzgikerxjrs";
const googleYouTubeChannelId = "UCegkxRhEtHGlE60RAo4ZwSg";

/**
 * Returns the YouTube videos on the company channel.
 */
export async function fetchVideos(): Promise<YouTubeVideoList> {
  const maxResults = 25;
  const playlistId = await fetchPlaylistId();
  const playlistItemsResponse = await fetchResource<PlaylistItemsResponse>(
    "playlistItems",
    {
      part: encodeURIComponent("snippet,contentDetails"),
      playlistId,
      maxResults: maxResults.toString(),
    },
  );

  const videos = playlistItemsResponse.items;

  return videos;
}

export type YouTubeVideoList = PlaylistItemsResponse["items"];

/**
 * Returns the playlist id for the company YouTube channel.
 */
async function fetchPlaylistId() {
  const channelsResponse = await fetchResource<ChannelsResponse>("channels", {
    id: googleYouTubeChannelId,
    part: "contentDetails",
  });

  const playlistId =
    channelsResponse.items[0].contentDetails.relatedPlaylists.uploads;
  if (typeof playlistId !== "string") {
    throw new Error("Expected string for playlist id.");
  }

  return playlistId;
}

/**
 * Performs an api get request to the YouTube Api. It attaches the api key and
 * returns api errors.
 *
 * @param resource YouTube Api resource to retrieve, e.g. channels.
 * @param paramsMap Key value map of request parameters to attach.
 */
async function fetchResource<T>(
  resource: string,
  paramsMap: Record<string, string>,
) {
  const paramElements: string[] = [];

  paramElements.push(`key=${googleYouTubeApiKey}`);
  Object.keys(paramsMap).forEach(key => {
    paramElements.push(`${key}=${paramsMap[key]}`);
  });

  const params = paramElements.join("&");

  const request = await fetch(
    `https://www.googleapis.com/youtube/v3/${resource}/?${params}`,
  );
  const json: T = await request.json();

  if (!request.ok) {
    throw new Error(JSON.stringify(json, null, 2));
  }

  return json;
}

interface ChannelsResponse {
  items: {
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }[];
}

interface PlaylistItemsResponse {
  items: {
    kind: string;
    id: string;

    contentDetails: {
      videoId: string;
      videoPublishedAt: string;
    };

    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: Record<
        "default" | "medium" | "high" | "standard" | "maxres",
        {
          url: string;
          width: number;
          height: number;
        }
      >;
      channelTitle: string;
      playlistId: string;
      position: number;
      resourceId: {
        kind: string;
        videoId: string;
      };
    };
  }[];
}
