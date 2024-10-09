import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import slideimg01 from '../../Images/Artboard 1.jpg';
import slideimg02 from '../../Images/Artboard 2.jpg';
import slideimg03 from '../../Images/Artboard 3.jpg';
import './HomeSlide.css';

const HomeSlide = () => {
    return (
        <div>
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                    style={{
                        width: '100%',
                        height: '600px',
                    }}
                    className="d-block w-100"
                    src={slideimg01}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    style={{
                        width: '100%',
                        height: '600px',
                    }}
                    className="d-block w-100"
                    src={slideimg02}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    style={{
                        width: '100%',
                        height: '600px',
                    }}
                    className="d-block w-100"
                    src={slideimg03}
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
      );
}

export default HomeSlide;