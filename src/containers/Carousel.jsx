
import React, { Component } from 'react';
// import Slider from 'react-slick';
import Coverflow from 'react-coverflow';

class Carousel extends Component {



  render() {

    return (
      <Coverflow width="100vw" height="400"
        displayQuantityOfSide={2}
        navigation={false}
        enableScroll={true}
        clickable={true}
        active={2}
        >
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>
          <div><h1>Hello whatsup</h1></div>


      </Coverflow>
    );
  }
};
export default Carousel;
