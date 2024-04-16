import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { makeStyles } from "@material-ui/core/styles";
import { Carousel } from 'react-carousel-minimal';


const useStyles = makeStyles({
 captionStyle :{
    fontSize: '2em',
    fontWeight: 'bold',
  },
   slideNumberStyle:{
    fontSize: '20px',
    fontWeight: 'bold',
  }


  
});
const captionStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
}
const slideNumberStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
}
const data = [
  {
    image: "https://www.sikarin.com/wp-content/uploads/2021/06/14267362885810-1024x683.jpg",
  },
  {
    image: "https://obs-phwebsite-prd.obs.ap-southeast-2.myhuaweicloud.com/psuv/20221202132724-1%E0%B8%A7%E0%B8%B1%E0%B8%84%E0%B8%8B%E0%B8%B5%E0%B8%99%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88%E0%B9%83%E0%B8%99%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%A5%E0%B8%B0%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%87%E0%B8%AD%E0%B8%B2%E0%B8%A2%E0%B8%B8.jpg",
  },
  {
    image: "https://www.nakornthon.com/Upload/Images/Content/637515065076727938/Image_AW_Banner_%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%89%E0%B8%B5%E0%B8%94%E0%B8%A7%E0%B8%B1%E0%B8%84%E0%B8%8B%E0%B8%B5%E0%B8%99%20COVID-19%20(%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%AA%E0%B8%A3%E0%B8%A3%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B1%E0%B8%90%E0%B8%9A%E0%B8%B2%E0%B8%A5)%20%E0%B8%97%E0%B8%B5%E0%B9%88%20%E0%B8%A3%E0%B8%9E.%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%98%E0%B8%99-03.jpg",
  },
  {
    image: "https://www.nonthavej.co.th/datafiles/2023/Promotion/vaccine-adult/vaccine-adult-New-C-01.jpg",
  },

  
];
const  CarouselHome =({MoviesPath_Description_JSON}) => {
  const classes = useStyles();

  return (
    <div  style={{marginTop:65}}>
        <div>
          <Carousel
            data={data}
            time={2000}
            width="100%"
            height="80vh"
            captionStyle={captionStyle}
            // radius="10px"
            slideNumber={true}
            // slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"

          />
        </div>
 </div>
  );
}

export default CarouselHome;
