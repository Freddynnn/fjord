// MediaList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss'

const MediaList = ({ mediaItems, mediaType }) => {
    const [imageLoaded, setImageLoaded] = useState(mediaItems.map(() => false));


    const getLinkUrl = (id) => {
        switch (mediaType) {
            case 'shows':
                return `/shows/show/${id}`;
            case 'movies':
                return `/movies/movie/${id}`;
            case 'books':
                return `/books/book/${id}`;
            case 'music':
                return `/music/release/${id}`;
            default:
                return '/';
        }
    };    

    const handleImageLoad = (index) => {
        const newImageLoaded = [...imageLoaded];
        newImageLoaded[index] = true;
        setImageLoaded(newImageLoaded);
    };

    return (
        <div className="media-results"> 
            <ul className="media-list">
                {mediaItems.map((media, index)=> (
                <li key={media._id}>
                    <Link to={getLinkUrl(media._id)} className="link-style">   
                        <div className='image-container' style={mediaType === 'music' ? { aspectRatio: `2/2` } : { aspectRatio: `11/16` }}>
                            {!imageLoaded[index] && <div className='image-loading' />}
                            <img
                                src={media.coverImage}
                                alt={media.name}
                                onLoad={() => handleImageLoad(index)}
                                style={!imageLoaded[index] ? { display: 'none' } : {}}
                            />
                        </div>


                        <div className="media-info">
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
                        </div>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default MediaList;
