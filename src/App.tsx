import { useState } from "react";
import {
  getChannelDetails,
  getVideoComments,
  getVideoDetails,
} from "./utils/youtube";
import Navbar from "./components/Navbar";
import CommentList from "./components/CommentList";
import ChannelInfo from "./components/ChannelInfo";
import VideoDetails from "./components/VideoDetails";

interface Comment {
  author: string;
  comment: string;
  publishedAt: string;
}

interface ChannelDetails {
  channelTitle: string;
  description: string;
  subscriberCount: string;
  videoCount: string;
  totalViews: string;
  channelImg: string;
}
interface VideoDetails {
  title: string;
  description: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  thumbnailUrl: string;
}
function App() {
  const [url, setUrl] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [channelInfo, setChannelInfo] = useState<ChannelDetails | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const videoId = new URL(url).searchParams.get("v");
      if (!videoId) throw new Error("Invalid YouTube URL");

      const [commentsData, videoDetails] = await Promise.all([
        getVideoComments(videoId),
        getVideoDetails(videoId),
      ]);

      const channelDetails = await getChannelDetails(videoDetails.channelId);

      setComments(commentsData);
      setChannelInfo(channelDetails);
      setVideoInfo(videoDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-8">
        
      <div className="flex justify-between items-center">
        <p className="text-4xl text-gray-600 mt-[100px] mb-4">
          Enter a YouTube video URL to fetch data about the video and its
          comments.
        </p>
        <img src="/sideImg.avif" alt="" />
      </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-md rounded-lg mb-10"
        >
          <label className="block text-lg font-semibold text-gray-600 mb-2">
            Enter YouTube Video URL:
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=example"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />
          <button
            type="submit"
            className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-400 hover:bg-green-500"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Data"}
          </button>
        </form>
        <VideoDetails videoDetails={videoInfo} />
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <CommentList comments={comments} />

          <ChannelInfo channelInfo={channelInfo} />
        </div>
      </div>
    </>
  );
}

export default App;
