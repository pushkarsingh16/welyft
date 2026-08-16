import React from "react";
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedinIn, FaFacebook } from "react-icons/fa";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <>
      <section id="contact" 
      className="scroll-mt-20 sm:scroll-mt-12 lg:scroll-mt-16 fraunces bg-[#F6F5F0] relative overflow-hidden pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12 px-4 sm:px-5 lg:px-10">
        <div className="min-h-[180px] text-center py-6 sm:py-10 lg:py-12 rounded-[28px] bg-gradient-to-br from-[#0A1F44] to-[#163B7A] relative z-10 flex flex-col mx-auto max-w-8xl">


          <h1 className=" text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold lg:leading-18 max-w-5xl mx-auto text-white">
            Ready to Move Your Business
           
            Cleaner and Smarter?
          </h1>
          <p className="mx-auto px-5 mt-5 max-w-4xl text-sm  text-white sm:text-lg lg:text-xl ">
            Partner with Welyft for EV-powered logistics, reliable delivery
            operations, and sustainability-focused reporting
          </p>
          

        </div>
      </section>
      <ContactForm />
    </>
  );
};

export default Contact;
