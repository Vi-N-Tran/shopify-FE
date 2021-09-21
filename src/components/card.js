/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../style.scss';
import whiteHeart from '../img/whiteHeart.png';
import redHeart from '../img/redHeart.png';

const Card = (props) => {
  const [liked, setLiked] = useState(false);
  const { pic } = props;
  return (
    <div className="card-container">
      <img className="card-image" src={pic.url} alt={pic.title} />
      <div className="row flex-between">
        <p className="yellow-text">{pic.title}</p>
        {liked
          ? <img className="heart" src={redHeart} alt="red Heart" onClick={() => setLiked(!liked)} />
          : <img src={whiteHeart} className="heart" alt="white heart" onClick={() => setLiked(!liked)} />}
      </div>
      <p>{pic.date}</p>
      <p>{pic.explanation}</p>
    </div>
  );
};

export default Card;
