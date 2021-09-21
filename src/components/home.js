/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import { connect } from 'react-redux';
import '../style.scss';
import DatePicker from 'react-datepicker';

import Particles from 'react-particles-js';
import { fetchNasaPics } from '../actions';
import Card from './card';

const Home = (props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [count, setCount] = useState();
  const [search, setSearch] = useState(false);

  useEffect(() => {
    props.fetchNasaPics(undefined, undefined, count);
  }, []);

  if (search) {
    console.log('home count', count);
    props.fetchNasaPics(startDate, endDate, count);
    setSearch(false);
  }

  const displayCards = () => {
    return (
      props.pics.slice(3).map((pic) => {
        if (pic.media_type === 'image') {
          return <Card pic={pic} key={pic.title} />;
        } else {
          return <div />;
        }
      })
    );
  };

  const displayInputBar = () => {
    return (
      <div className="row inputBar">
        {!count ? (
          <div className="row">
            <div>
              <p>start date</p>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div>
              <p>end date</p>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
          </div>
        )
          : <div />}
        {!startDate && !endDate ? (
          <div>
            <p>number of pictures</p>
            <input onChange={(event) => setCount(event.target.value)} />
          </div>
        ) : <div />}
        <button type="submit" className="btn btn- searchButton" onClick={() => setSearch(true)}>Search</button>
      </div>
    );
  };

  if (!props.pics) {
    return (
      <div>
        <Particles className="particle-js" />
        <div className="loading">
          <h2>Reaching for the stars...</h2>
          <p>Optimized for 13in screens</p>
        </div>
      </div>
    );
  } else {
    if (props.pics.length < 3) {
      return (
        <div>
          {displayInputBar()}
          <div>
            <h2>Please select a longer date interval</h2>
          </div>
          <Particles className="particle-js" />
        </div>
      );
    }
    const featurePic = props.pics[0];
    const placeHolderPic = 'https://www.treehugger.com/thmb/Bqy4Ek0WsS0_V4RuJAPABTW0Ym4=/3000x3000/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2019__07__shutterstock_113278297-247408febef145a5a6f04eeff17e85f4.jpg';
    return (
      <div>
        <div>
          <div>
            <h3><span className="vi">V</span>enusify</h3>
          </div>
          <div className="row">
            <div className="home-left">
              <div className="home-info-container">
                <h1>{featurePic.title}</h1>
                <p>{featurePic.date}</p>
                <p>{featurePic.explanation}</p>
              </div>
              <div className="home-feature-image-container">
                <img className="home-feature-image" src={featurePic.url && featurePic.media_type === 'image' ? featurePic.url : placeHolderPic} alt={featurePic.title} />
              </div>
            </div>
            <div className="home-right">
              <div className="home-right-image-container row">
                <img className="home-right-image" src={props.pics[1].url && props.pics[1].media_type === 'image' ? props.pics[1].url : placeHolderPic} alt={props.pics[1].title} />
                <img className="home-right-image clip-image" src={props.pics[2].url && props.pics[2].media_type === 'image' ? props.pics[2].url : placeHolderPic} alt={props.pics[2].title} />
              </div>
            </div>
          </div>
        </div>
        {displayInputBar()}
        <div className="row wrap purple-background">
          {displayCards()}
        </div>
      </div>
    );
  }
};

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    pics: state.nasa.pics,
  }
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default connect(mapStateToProps, { fetchNasaPics })(Home);
