import axios from "axios";
// for getting comments
const API_KEY = process.env.YOUTUBE_API_KEY;
export async function getVideoComments(videoId: string) {
  try {
    console.log("video id=", videoId);
    console.log("api key=", process.env.YOUTUBE_API_KEY);
    const url = `https://www.googleapis.com/youtube/v3/commentThreads`;

    const response = await axios.get(url, {
      params: {
        part: "snippet",
        videoId: videoId,
        key: API_KEY,
        maxResults: 20,
      },
    });

    const comments = response.data.items.map((item: any) => ({
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      comment: item.snippet.topLevelComment.snippet.textDisplay,
      publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
    }));
    console.log(comments);
    return comments;
  } catch (error) {
    console.log(error);
  }
}

export async function getChannelId(videoId: string) {
  try {
    const fullUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyB7C9YX6hz80gZgLEh5mSp5b4Og1W0oDjM`;
    const url = `https://www.googleapis.com/youtube/v3/videos`;
    const response = await axios.get(url, {
      params: {
        part: "snippet",
        id: videoId,
        key: API_KEY,
      },
    });

    if (response.data.items.length === 0) {
      throw new Error("Invalid video ID or no data available.");
    }

    const videoDetails = response.data.items[0].snippet;
    return {
      channelId: videoDetails.channelId,
      channelTitle: videoDetails.channelTitle,
      videoTitle: videoDetails.title,
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
}

export async function getChannelDetails(channelId: string) {
  try {
    const fullUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UC4VQ9IlUFTspf6FV-MdKFvA&key=AIzaSyB7C9YX6hz80gZgLEh5mSp5b4Og1W0oDjM`;
    const url = "https://www.googleapis.com/youtube/v3/channels";
    const response = await axios.get(url, {
      params: {
        part: "snippet,statistics",
        id: channelId,
        key: API_KEY,
      },
    });
    if (response.data.items.length === 0) {
      throw new Error("Invalid video ID or no data available.");
    }
    const channel= response.data.items[0];
    return {
      channelTitle: channel.snippet.title,
      description: channel.snippet.description,
      subscriberCount: channel.statistics.subscriberCount,
      videoCount: channel.statistics.videoCount,
      totalViews: channel.statistics.viewCount,
      channelImg: channel.snippet.thumbnails.default.url
    }
  } catch (error) {
    console.log("errro fetching channel details :", error);
  }
}
