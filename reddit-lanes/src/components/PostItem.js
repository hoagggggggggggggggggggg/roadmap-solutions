function PostItem({ post }) {
    return (
      <div className="post-item">
        <div className="post-votes">^ {post.ups}</div>
        <div className="post-content">
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="post-title">
            {post.title}
          </a>
          <div className="post-author">by {post.author}</div>
        </div>
      </div>
    )
  }
  
  export default PostItem
  