import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/slide-02.jpg'

const Slider = () => {
  return (
    <div className='slide'>
      <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Your Ideal Retreat</h3>
          <p>ndulge in our top-notchspa resort.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Your Ideal Retreat</h3>
          <p>ndulge in our top-notchspa resort.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Slider
