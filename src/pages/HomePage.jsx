import Home from "../components/Home";
import { Helmet } from 'react-helmet-async';

import About from "../components/About";
import Services from "../components/Services";
import Sustainability from "../components/Sustainability";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
// import CO2Dashboard from "../components/CO2Savings/CO2Dashboard";

const HomePage = () => {
  return (
    <>
        <Helmet>
        <title>Welyft | Sustainable EV Logistics & Last-Mile Delivery Singapore</title>
        <meta
          name="description"
          content="Welyft powers B2B, B2C & C2C logistics across Singapore with a 100% electric fleet — smart, sustainable delivery."
        />
        <link rel="canonical" href="https://www.welyft.org/" />

        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Welyft",
            "url": "https://www.welyft.org",
            "logo": "https://www.welyft.org/logo.png",
            "description": "Sustainable EV logistics company providing B2B, B2C and C2C delivery solutions in Singapore.",
            "sameAs": [
              "https://www.facebook.com/youpackWelyft",
              "https://www.linkedin.com/company/youpackwelyft/",
              "https://www.instagram.com/welyftsg"
            ]
          })}
        </script>
      </Helmet>
      
      <Home />
      <About />
      <Services />
      {/* <CO2Dashboard /> */}
      <Sustainability />
      <Blog />
      <Contact />
    </>
  );
};

export default HomePage;
