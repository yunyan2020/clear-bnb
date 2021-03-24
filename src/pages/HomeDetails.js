import Media from 'react-media';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Dots } from '@brainhubeu/react-carousel';

const Popup = (props) => {

  const thumbnailsIo = {
  value: 0,
    slides: [
      (<img style={styles.gallery} src="https://www.kontio.com/static/studio/pub/Models/Glass+House+talo+143/Glass+House+143.jpg?c=model_xl" />),
      (<img style={styles.gallery} src="https://www.lux-review.com/wp-content/uploads/2020/02/luxury-bathroom.jpg" />),
      (<img style={styles.gallery} src="https://cdn.bigbathroomshop.co.uk/media/catalog/product/cache/07469e52453ec3e9e92a88c7a63b12d8/b/c/bctbw102_ls_1000_2.jpg" />),
    ],
      thumbnails: [
        (<img style={styles.thumbnails} src="https://www.kontio.com/static/studio/pub/Models/Glass+House+talo+143/Glass+House+143.jpg?c=model_xl" />),
        (<img style={styles.thumbnails} src="https://www.lux-review.com/wp-content/uploads/2020/02/luxury-bathroom.jpg" />),
        (<img style={styles.thumbnails} src="https://cdn.bigbathroomshop.co.uk/media/catalog/product/cache/07469e52453ec3e9e92a88c7a63b12d8/b/c/bctbw102_ls_1000_2.jpg" />),
      ],
    }
   onchange = onchange.bind(this);

  function onchange(value) {
    this.setThumbnailsIo({ value });
  }



  return (props.trigger) ? (

    

    <div className="popup" style={styles.popup}>
    
   <Media query="(max-width: 599px)">
  
  {matches =>
            matches ? (

      <div className="popup-inner-mobile" style={styles.popupInnerMobile} >
        <button className="close-btn"
          style={styles.closeBtn}
          onClick={() => props.setTrigger(false)}
          >close</button>
        { props.children }
      </div>
       ) : ( 
  <div className="popup-inner-computer" style={styles.popupInnerComputer} >
        <button className="close-btn"
          style={styles.closeBtn}
          onClick={() => props.setTrigger(false)}
                >close</button>
                
                <div className="gallery" >

                  <Carousel value={thumbnailsIo.value}
                    slides={thumbnailsIo.slides}
                    onChange={thumbnailsIo.onchange} />
                    {/* <div>
                      <h3>House</h3>
                      <img style={styles.gallery} src="https://www.kontio.com/static/studio/pub/Models/Glass+House+talo+143/Glass+House+143.jpg?c=model_xl" />
                    </div>

                    <div>
                      <h3>Bathroom</h3>
                      <img style={styles.gallery} src="https://www.lux-review.com/wp-content/uploads/2020/02/luxury-bathroom.jpg" />
                    </div>

                    <div>
                      <h3>Toilet</h3>
                    <img style={styles.gallery} src="https://cdn.bigbathroomshop.co.uk/media/catalog/product/cache/07469e52453ec3e9e92a88c7a63b12d8/b/c/bctbw102_ls_1000_2.jpg" />
                    </div> */}

                  <Dots number={thumbnailsIo.length} thumbnails={thumbnailsIo.thumbnails} value={thumbnailsIo.value} onChange={thumbnailsIo.onchange} number={thumbnailsIo.slides.length} />

                </div>

        { props.children }
      </div>
        
            )
       }
           </Media>
    </div>
  ) : "";
}

const styles = {
  
  popup: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
       

  },

  popupInnerMobile: {
    position: 'relative',
    padding: '300px 0px 300px 0px',
   
    width: '100%',
   height: '100%',
    backgroundColor: '#FFF',
    
  },

  popupInnerComputer: {
    position: 'relative',
    padding: '300px 0px 300px 0px',
   
    width: '65%',
   height: '50%',
    backgroundColor: '#FFF',
    overflow: 'scroll'
  },

   closeBtn: {
    position: 'absolute',
    top: '16px',
     right: '16px',
     cursor: 'pointer'
  },

  gallery: {
    width: 'auto',
    height: '500px',
   
  },

  thumbnails: {
    width: 'auto',
    height: '100px',
  }

}
 
export default Popup;