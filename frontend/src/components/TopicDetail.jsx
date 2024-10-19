import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {FORUM_API_BASE} from "../constants/api.jsx";

function TopicDetail() {
    const [topic, setTopic] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        axios.get(`${FORUM_API_BASE}/topics/${id}/`)
            .then(response => setTopic(response.data))
            .catch(error => console.error('Error fetching topic:', error))
    }, [id])

    if (!topic) return <p>Loading topic...</p>

    return (
        <div>
            <h1>{topic.name}</h1>
            <p>{topic.content}</p>
            <h2>Posts:</h2>
            {topic.posts.map(post => (
                <div key={post.id}>
                    <p>{post.content}</p>
                    <small>By: {post.author.email}</small>
                </div>
            ))}
        </div>
    )
}

export default TopicDetail
