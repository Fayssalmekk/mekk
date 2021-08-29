import React from 'react';
import './Gall.css';
import logo1 from '../../Assets/logo01.png'
import logo2 from '../../Assets/logo2.jpg'
import logo3 from '../../Assets/logo3.jpg'
import logo4 from '../../Assets/logo4.jpg'
import logo5 from '../../Assets/logo5.jpg'
import logo6 from '../../Assets/logo6.png'
import logo7 from '../../Assets/logo7.jpg'
import logo8 from '../../Assets/logo8.png'
import logo9 from '../../Assets/logo9.jpg'
import logo10 from '../../Assets/logo10.jpg'
import logo11 from '../../Assets/logo11.png'
import logo12 from '../../Assets/logo12.png'
import logo13 from '../../Assets/logo13.jpg'
import logo14 from '../../Assets/logo14.png'
import logo15 from '../../Assets/logo15.jpg'


const { useState } = React;

//IMAGES
//you can also import a local file, the syntax would look like:
//import image1 from './images/imagename.jpg'





//IMAGE ARRAY
const images = [logo1,logo2,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo10,logo11,logo12,logo13,logo14,logo15];


//MAIN APP COMPONENT
function Gall3() {
  return (
    <div id className="App container">


      <ImageGallery />
    </div>
  );
}


//MAIN LIGHTBOX
//Holds Images Cards and Lightbox
//this is where all of our logic will live
function ImageGallery() {
  const [imageToShow, setImageToShow] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  //looping through our images array to create img elements
  const imageCards = images.map((image) => (
    <img className="image-card " alt="profil" onClick={() => showImage(image)} src={image} />
  ));

  //function to show a specific image in the lightbox, amd make lightbox visible
  const showImage = (image) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
  };

  //hide lightbox
  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  //show next image in lightbox
  const showNext = (e) => {
    e.stopPropagation();
    let currentIndex = images.indexOf(imageToShow);
    if (currentIndex >= images.length - 1) {

    } else {
      let nextImage = images[currentIndex + 1];
      setImageToShow(nextImage);
    }
  };

  //show previous image in lightbox
  const showPrev = (e) => {
    e.stopPropagation();
    let currentIndex = images.indexOf(imageToShow);
    if (currentIndex <= 0) {

    } else {
      let nextImage = images[currentIndex - 1];
      setImageToShow(nextImage);
    }
  };


  return (
    <>
      <h1 className="title"> PRINTS  </h1>
      <div className=" mt-5">{imageCards}</div>

      {
        lightboxDisplay ?
          <div id="lightbox" className="lightbox" onClick={hideLightBox}>
            <button onClick={showPrev}> &larr; </button>
            <img className="lightbox-img" id="lightbox-img" alt="profil" src={imageToShow}></img>
            <button onClick={showNext}> &rarr; </button>
          </div>
          : ""
      }
    </>
  );
}

export default Gall3;
