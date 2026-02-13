import React from 'react';
import './Gall.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ui10 from '../../Assets/ui10.jpg'
import ui2 from '../../Assets/ui2.jpg'
import ui3 from '../../Assets/ui3.jpg'
import ui4 from '../../Assets/ui4.png'
import ui5 from '../../Assets/ui5.png'
import ui6 from '../../Assets/ui6.png'
import ui7 from '../../Assets/ui7.jpg'
import ui11 from '../../Assets/ui11.jpg'
import ui13 from '../../Assets/ui13.jpg'
import ui14 from '../../Assets/ui4.jpg'


import ui8 from '../../Assets/ui8.jpg'
import ui9 from '../../Assets/ui9.jpg'



const { useState, useEffect } = React;








//IMAGE ARRAY
const images = [ui2, ui3, ui4, ui5, ui6, ui7, ui8, ui9, ui10 , ui11 , ui14 , ui13];


//SKELETON LOADER
function GallerySkeleton() {
  return (
    <div className="gallery-skeleton-container">
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} width={350} height={350} borderRadius={20} style={{ margin: '10px' }} />
      ))}
    </div>
  );
}


//MAIN APP COMPONENT
function Gall() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay or load images
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App container animation ">
      {loading ? (
        <GallerySkeleton />
      ) : (
        <ImageGallery />
      )}
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
      <h1 className="title"> UI/UX  </h1>
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

export default Gall;
