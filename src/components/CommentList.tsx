interface Comment {
    author: string
    comment: string
    publishedAt: string
  }
  
  interface CommentListProps {
    comments: Comment[]
  }
  
  export default function CommentList({ comments }: CommentListProps) {
    return (
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length === 0 ? (
          <p>No comments to display.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment, index) => (
              <li key={index} className="border p-4 rounded">
                <p className="font-bold">{comment.author}</p>
                <p className="mt-2">{comment.comment}</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(comment.publishedAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
  
  