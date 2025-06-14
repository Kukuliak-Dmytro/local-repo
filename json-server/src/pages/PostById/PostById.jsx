import './PostById.css';
import { useState, useEffect } from 'react';
import { getPostById } from '../../services/postsServices';
import { useParams } from "react-router";

export default function PostById() {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    const getCurrentPost = async (id) => {
        try {
            const postData = await getPostById(id);
            if (postData) {
                setPost(postData);
            } else {
                setError('Post not found');
            }
        } catch (err) {
            setError('Error fetching post');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        getCurrentPost(id);
        // eslint-disable-next-line
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (!post || Object.keys(post).length === 0) {
        return <div>No post found</div>;
    }

    return (
        <div className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.content}</p>
            <p className="post-date">Created at: {new Date(post.created_at).toLocaleDateString()}</p>
        </div>
    );
}