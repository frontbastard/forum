import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FORUM_API_BASE} from "../constants/api.jsx";
import axios from "axios";

function TopicList() {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        axios.get(`${FORUM_API_BASE}/topics/`)
            .then(response => setTopics(response.data.results))
            .catch(error => console.error('Error fetching topics:', error))
    }, []);

    if (!topics.length) return <p>Loading topics...</p>

    return (
        <div>
            <h1>Topics</h1>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>
                        <Link to={`/topic/${topic.id}`}>{topic.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TopicList
