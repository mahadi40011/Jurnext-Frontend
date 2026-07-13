import React from 'react';
import AdvertiseSlider from '../../components/Home/AdvertiseSlider';
import LatestTickets from '../../components/Home/LatestTickets';
import PopularRoutes from '../../components/Home/PopularRoutes';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import HeroSection from '../../components/Home/HeroSection';

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <AdvertiseSlider />
      <LatestTickets />
      <PopularRoutes />
      <WhyChooseUs/>
    </div>
  );
};

export default Home;