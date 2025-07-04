import React from "react";
import "./FriendCard.css";

export default function FriendCard({ friend }) {
  return (
    <div className="friend-card">
      <div className="friend-info">
        <h2>{friend.fullName}</h2>
        <p>Phone: {friend.phone}</p>
        <p>Age: {friend.age}</p>
      </div>
      <div className="friend-posts">
        <h3>Posts</h3>
        {friend.posts && friend.posts.length > 0 ? (
          friend.posts.map((post) => (
            <div className="friend-post" key={post.id}>
              <div className="post-content">{post.content}</div>
              <div className="post-comments">
                <h4>Comments</h4>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                      <span className="comment-author">{comment.author}:</span>
                      <span className="comment-content"> {comment.content}</span>
                    </div>
                  ))
                ) : (
                  <div className="no-comments">No comments yet.</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-posts">No posts yet.</div>
        )}
      </div>
    </div>
  );
} 