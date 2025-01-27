import axios from "axios"

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export async function getVideoComments(videoId: string) {
  try {
    console.log("video id=", videoId)
    console.log("api key=", API_KEY)
    const url = `https://www.googleapis.com/youtube/v3/commentThreads`

    const response = await axios.get(url, {
      params: {
        part: "snippet",
        videoId: videoId,
        key: API_KEY,
        maxResults: 20,
      },
    })

    const comments = response.data.items.map((item: any) => ({
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      comment: item.snippet.topLevelComment.snippet.textDisplay,
      publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
    }))
    console.log(comments)
    return comments
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getVideoDetails(videoId: string) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos`
    const response = await axios.get(url, {
      params: {
        part: "snippet,statistics",
        id: videoId,
        key: API_KEY,
      },
    })

    if (response.data.items.length === 0) {
      throw new Error("Invalid video ID or no data available.")
    }

    const videoDetails = response.data.items[0]
    return {
      title: videoDetails.snippet.title,
      description: videoDetails.snippet.description,
      publishedAt: videoDetails.snippet.publishedAt,
      viewCount: videoDetails.statistics.viewCount,
      likeCount: videoDetails.statistics.likeCount,
      thumbnailUrl: videoDetails.snippet.thumbnails.medium.url,
      channelId: videoDetails.snippet.channelId,
      channelTitle: videoDetails.snippet.channelTitle,
    }
  } catch (error) {
    console.error("Error fetching video details:", error)
    throw error
  }
}

export async function getChannelDetails(channelId: string) {
  try {
    const url = "https://www.googleapis.com/youtube/v3/channels"
    const response = await axios.get(url, {
      params: {
        part: "snippet,statistics",
        id: channelId,
        key: API_KEY,
      },
    })
    if (response.data.items.length === 0) {
      throw new Error("Invalid channel ID or no data available.")
    }
    const channel = response.data.items[0]
    return {
      channelTitle: channel.snippet.title,
      description: channel.snippet.description,
      subscriberCount: channel.statistics.subscriberCount,
      videoCount: channel.statistics.videoCount,
      totalViews: channel.statistics.viewCount,
      channelImg: channel.snippet.thumbnails.default.url,
    }
  } catch (error) {
    console.log("Error fetching channel details:", error)
    throw error
  }
}

