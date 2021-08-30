import React from 'react';
import './Gall.css';
import fly1 from '../../Assets/fly1.jpg'
import fly2 from '../../Assets/fly2.jpg'
import fly3 from '../../Assets/fly3.jpg'
import fly4 from '../../Assets/fly4.jpg'
import fly5 from '../../Assets/fly5.jpg'
import fly6 from '../../Assets/fly6.jpg'
import fly7 from '../../Assets/fly7.jpg'

import fly8 from '../../Assets/fly8.jpg'
import fly9 from '../../Assets/fly9.jpg'
import fly10 from '../../Assets/fly10.jpg'
import fly11 from '../../Assets/fly11.jpg'
import fly12 from '../../Assets/fly12.jpg'
import fly13 from '../../Assets/fly13.jpg'
import fly14 from '../../Assets/fly14.jpg'


const { useState } = React;

//IMAGES
//you can also import a local file, the syntax would look like:
//import image1 from './images/imagename.jpg'





//IMAGE ARRAY
const images = [fly1, fly2, fly3, fly4, fly5, fly6, fly7, fly8, fly9, fly10, fly11, fly12, fly13, fly14];


//MAIN APP COMPONENT
function Gall2() {
  return (
    <div id className="App container animation">


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

export default Gall2;
