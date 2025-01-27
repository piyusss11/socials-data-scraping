interface VideoDetails {
    title: string
    description: string
    publishedAt: string
    viewCount: string
    likeCount: string
    thumbnailUrl: string
  }
  
  interface VideoDetailsProps {
    videoDetails: VideoDetails | null
  }
  
  export default function VideoDetails({ videoDetails }: VideoDetailsProps) {
    if (!videoDetails) return null
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl underline mb-4 text-center">Video Details</h2>
        <div className="flex flex-col justify-center md:flex-row gap-4">
          <img
            src={videoDetails.thumbnailUrl || "/placeholder.svg"}
            alt={videoDetails.title}
            className="w-full md:w-[200px] md:h-full rounded-lg"
          />
          <div className="w-full md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">{videoDetails.title}</h3>
            <p className="text-gray-600 mb-4 overflow-hidden h-[100px] ">{videoDetails.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Published</p>
                <p>{new Date(videoDetails.publishedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">Views</p>
                <p>{Number.parseInt(videoDetails.viewCount).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Likes</p>
                <p>{Number.parseInt(videoDetails.likeCount).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  