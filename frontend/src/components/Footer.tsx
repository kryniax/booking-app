import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          Niceplace.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
