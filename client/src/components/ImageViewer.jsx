import React from 'react';
import style from '../styles/imageViewer.css';

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      numItems: 0,
      firstItem: 0, //first item visible in the thumbnail carousel
      lastItem: 0, //last item visible in the thumbnail carousel
      shiftCount: 0,
      upArrowDisplay: "none",
      downArrowDisplay: "none"
    }
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.setImage = this.setImage.bind(this);
    this.shiftUp = this.shiftUp.bind(this);
    this.shiftDown = this.shiftDown.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      numItems: props.images.length,
      lastItem: props.images.length > 7 ? 7 : props.images.length - 1
    });

    if (props.images.length > 7) {
      this.setState({
        downArrowDisplay: "flex"
      });
    }
  }

  previousImage() {
    let images = this.props.images;
    if (this.state.imageIndex > 0) {
      this.setState({
        imageIndex: this.state.imageIndex - 1
      });
    } else {
      this.setState({
        imageIndex: images.length - 1
      });
    }
  }

  nextImage() {
    let images = this.props.images;
    if (this.state.imageIndex < images.length - 1) {
      this.setState({
        imageIndex: this.state.imageIndex + 1
      });
    } else {
      this.setState({
        imageIndex: 0
      });
    }
  }

  setImage(e) {
    e.preventDefault();
    this.setState({
      imageIndex: Number(e.target.name)
    });
  }
  
  shiftDown(e) {
    e.preventDefault();
    this.setState({
      upArrowDisplay: this.state.firstItem === 1 ? "none" : "flex",
      downArrowDisplay: this.state.numItems > 8 ? "flex" : "none",
      firstItem: this.state.firstItem - 1,
      lastItem: this.state.lastItem - 1,
      shiftCount: this.state.shiftCount + 1
    });
  }

  shiftUp(e) {
    e.preventDefault();
    this.setState({
      upArrowDisplay: this.state.firstItem >= 0 ? "flex" : "none",
      downArrowDisplay: this.state.lastItem === this.state.numItems - 2 ? "none": "flex",
      firstItem: this.state.firstItem + 1,
      lastItem: this.state.lastItem + 1,
      shiftCount: this.state.shiftCount - 1
    });
  }

  render() {
    let images = this.props.images;

    return (
      <div className={style.container}>
        <div className={style.imageViewer}>
          <div className={style.imageContainer}>
            <img className={style.image} src={images[this.state.imageIndex]} />
            <div className={style.leftArrow} onClick={this.previousImage}>
              <div className={style.arrowShadow}>&#x027F5;</div>
              <div className={style.arrow}>&#x027F5;</div>
            </div>
            <div className={style.rightArrow} onClick={this.nextImage} >
              <div className={style.arrowShadow}>&#x027F6;</div>
              <div className={style.arrow}>&#x027F6;</div>
            </div>
          </div>
          <div className={style.carousel}>
            <div className={style.carouselContainer}>
              <div className={style.carouselPrev}>
                <button className={style.carouselButton} style={{backgroundImage:"url('https://s3-us-west-1.amazonaws.com/abibas-shoes/icons/arrow-up-icon.png')", display:this.state.upArrowDisplay}} onClick={this.shiftDown} />
              </div>
              {images.map((image, key) => {
                return (
                  <div className={style.thumbnail} key={key} style={{transform:`translate(0, ${this.state.shiftCount * 64}px)`}} onClick={this.setImage}>
                    <img className={style.thumbnailImage} name={key} src={image} />
                  </div>
                );
              })}
              <div className={style.carouselNext}>
                <button className={style.carouselButton} style={{backgroundImage:"url('https://s3-us-west-1.amazonaws.com/abibas-shoes/icons/arrow-down-icon.png')", display: this.state.downArrowDisplay}} onClick={this.shiftUp} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageViewer;
