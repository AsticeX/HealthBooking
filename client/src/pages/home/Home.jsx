import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Carousel from "../../components/carouselHome/Carousel";
import BlogHome from "../../components/blog/Blog";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel/>
      <BlogHome />
      <Footer />
    </div>
  );
};

export default Home;
