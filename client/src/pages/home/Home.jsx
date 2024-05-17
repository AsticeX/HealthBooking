import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Carousel from "../../components/carouselHome/Carousel";
import BlogHome from "../../components/blog/Blog";
import MailList from "../../components/mailList/MailList";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel/>
      <BlogHome />
      {/* <MailList /> */}
      <Footer />
    </div>
  );
};

export default Home;
