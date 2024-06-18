// MediaList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss'

const MediaList = ({ mediaItems, mediaType }) => {
    const getLinkUrl = (id) => {
        switch (mediaType) {
            case 'shows':
                return `/shows/show/${id}`;
            case 'movies':
                return `/movies/movie/${id}`;
            case 'books':
                return `books/book/${id}`;
            case 'music':
                return `music/release/${id}`;
            default:
                return '/';
        }
    };

    const getAspectRatio = () => {
        switch (mediaType) {
            case 'music':
                return { aspectRatio: '2/2' };
            default:
                return { aspectRatio: '2/3' };
        }
    };
    

    return (
        <div className="media-results"> 
            <ul className="media-list">
                {mediaItems.map(media => (
                <li key={media._id}>
                    <Link to={getLinkUrl(media._id)} className="link-style">
                    
                        <img src={media.coverImage} alt={media.name} style={getAspectRatio()}/>
                        <div className="info">
                        
                            <div className="title-container">
                                <div className="title">
                                    <span>{media.name}</span>
                                </div>
                            </div>
                            <div className="ratings-container">
                                <div className="grade">
                                    {media.grade}
                                </div>
                                <div className="score">
                                    {/* {media.score === 10 ? "10" : media.score.toFixed(1)}/10 */}
                                    {media.score}/10
                                </div>
                            </div>
                            {/* <div className="grade-score">
                                
                            </div> */}
                        </div>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default MediaList;
