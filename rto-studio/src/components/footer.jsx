import React from "react";
import logoBunny from "../assets/logoBunny.png";

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref} id="footer" className="text-gray-600 w-full bg-gray-200">
      <div className="container mx-auto ">
        <div className="py-1 flex items-center justify-center md:justify-between">
          <a
            href="https://clearbunny.tech/Landing"
            className="w-full text-md text-center md:text-left hover:text-gray-500 whitespace-nowrap flex items-center justify-center md:justify-start"
          >
            © 2023 — Powered by ClearBunny
          </a>
          <div className="w-9 h-9 p-2 overflow-hidden">
            <img className="w-full h-full object-cover" src={logoBunny} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
