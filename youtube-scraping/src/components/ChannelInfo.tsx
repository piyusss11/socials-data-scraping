interface ChannelDetails {
    channelTitle: string
    description: string
    subscriberCount: string
    videoCount: string
    totalViews: string
    channelImg: string
  }
  
  interface ChannelInfoProps {
    channelInfo: ChannelDetails | null
  }
  
  export default function ChannelInfo({ channelInfo }: ChannelInfoProps) {
    if (!channelInfo) return null
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Channel Info</h2>
        <img
          src={channelInfo.channelImg || "/placeholder.svg"}
          alt={channelInfo.channelTitle}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">{channelInfo.channelTitle}</h3>
        <p className="text-gray-600 mb-4">{channelInfo.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Subscribers</p>
            <p>{Number.parseInt(channelInfo.subscriberCount).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Videos</p>
            <p>{Number.parseInt(channelInfo.videoCount).toLocaleString()}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Total Views</p>
            <p>{Number.parseInt(channelInfo.totalViews).toLocaleString()}</p>
          </div>
        </div>
      </div>
    )
  }
  
  