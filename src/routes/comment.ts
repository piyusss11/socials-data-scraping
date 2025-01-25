import axios from "axios";

export async function getVideoComments(videoId: string) {
  try {
    console.log("video id=", videoId);
    console.log("api key=", process.env.YOUTUBE_API_KEY);

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const comments = response.data.items.map((item: any) => ({
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      comment: item.snippet.topLevelComment.snippet.textDisplay,
      publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
    }));
    console.log(comments);
  } catch (error) {
    console.log(error);
  }
}
