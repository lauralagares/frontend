import Carousel from 'react-bootstrap/Carousel';
import FirstImg from '../../imgs/img1.jpg';
import SecondImg from '../../imgs/img2.jpg';
import ThirdImg from '../../imgs/img3.jpg';
import FourthImg from '../../imgs/img4.jpg';
import FifthImg from '../../imgs/img5.jpg';

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: '600px', width: '100%', objectFit: 'cover'}}
          src={FirstImg}
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: '600px', width: '100%', objectFit: 'cover'}}
          src={SecondImg}
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: '600px', width: '100%', objectFit: 'cover'}}
          src={ThirdImg}
          alt="Third slide"
        />
      </Carousel.Item>

      
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: '600px', width: '100%', objectFit: 'cover'}}
          src={FourthImg}
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height: '600px', width: '100%', objectFit: 'cover'}}
          src={FifthImg}
          alt="Third slide"
        />
      </Carousel.Item>

    </Carousel>
  );
}

export default CarouselFadeExample;