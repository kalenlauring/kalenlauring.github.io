import { Link } from "react-router-dom";
import headshot from "../assets/headshot.png";
import Layout from "../components/Layout";
import "./Homepage.css";

export default function Homepage() {
  return (
    <Layout fadeDelay={1800}>
      <div className="flex flex-col items-center gap-3 w-full max-w-3xl">
        <div className="w-full flex justify-center">
          <div className="typewriter-container">
            <div className="typed-out-responsive">Hello, I'm Kalen Lauring!</div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px]">
          <Link to="/about">
            <img
              src={headshot}
              alt="Kalen Lauring's headshot"
              className="w-full h-auto aspect-square rounded-md object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
          </Link>
          <p className="text-center mt-3 sm:mt-5 text-xs sm:text-sm md:text-base fade-element">
            welcome to my website!
          </p>
        </div>
      </div>
    </Layout>
  );
}