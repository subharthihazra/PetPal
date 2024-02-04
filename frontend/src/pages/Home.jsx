import React from "react";
import Home1 from "../assets/home1.png";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button";
import hero2 from "../assets/xcat.png";
import Home3 from "../assets/home3.png";
import Home4 from "../assets/home4.png";
import Home5 from "../assets/home5.png";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Navbar from "@/components/Navbar";
import donate from "../assets/img2.png";

function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Navbar />
        <main className="px-8">
          <section className="my-16 ">
            <div className="grid grid-cols-2 place-content-center gap-8">
              <div className="m-auto">
                <h2 className="text-6xl font-bold">
                  Connect with your new best friend
                </h2>
                <p className="mt-4 text-xl">Find your perfect pet today</p>
                <Button className="mt-6 bg-red-600 text-white">
                  Adopt now
                </Button>
              </div>
              <div>
                <img
                  alt="Dogs"
                  className="rounded-lg"
                  src={hero2}
                  style={{
                    objectFit: "cover",
                  }}
                  width="450"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
      <div
        className="rounded w-full h-full ml-auto mr-auto py-4 px-8 text-center"
        style={{
          background: "#ef9e20",
          maxWidth: "73rem",
        }}
      >
        <div className="text-4xl font-bold text-center mb-4">
          Give your Pet a new Home
        </div>
        <div className="text-lg font-bold text-center mb-4">
          Join our community of pet lovers and find the perfect companion for
          your family.
        </div>
        <Button>Rehome Now</Button>
      </div>
      <div className=" max-w-7xl m-auto mt-12">
        <h2 className="text-3xl font-bold text-center">How it works</h2>
        <div className="flex justify-center mt-8">
          {/* <ChevronDownIcon className="w-6 h-6" /> */}

        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <img
              alt="Step 1"
              className="mb-4"
              height="120"
              src={Home3}
              style={{
                aspectRatio: "120/120",
                objectFit: "cover",
              }}
              width="120"
            />
            <h3 className="text-xl font-semibold mb-2">Step 1</h3>
            <p>
              Enter your location. Type in your city to find pets available for
              adoption near you.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              alt="Step 2"
              className="mb-4"
              height="120"
              src={Home4}
              style={{
                aspectRatio: "120/120",
                objectFit: "cover",
              }}
              width="120"
            />
            <h3 className="text-xl font-semibold mb-2">Step 2</h3>
            <p>
              Browse available pets and connect with their owners. You're one
              step closer to finding your perfect furry friend.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              alt="Step 3"
              className="mb-4"
              height="120"
              src={Home5}
              style={{
                aspectRatio: "120/120",
                objectFit: "cover",
              }}
              width="120"
            />
            <h3 className="text-xl font-semibold mb-2">Step 3</h3>
            <p>
              Finalize the adoption process. Then, welcome your new pet into
              your loving home!
            </p>
          </div>
        </div>
      </div>
      <div
        className="rounded w-full h-full ml-auto mr-auto py-4 px-8 text-center max-w-7xl my-4"
        style={{ background: "#b3b3d4" }}
      >
        <div className="text-4xl font-bold text-center mb-4">
          Know more about animals
        </div>
        <div className="text-lg font-bold text-center mb-4">
          Talk to our AI chatbot now with Image support
        </div>
        <Button>Chat Now</Button>
      </div>
      <div className="grid grid-cols-2 max-w-7xl m-auto my-6">
        <div className="flex flex-col items-center gap-2 h-full justify-center">
          <div className="text-4xl font-bold mb-4 text-center">Sponsor us</div>
          <div className="text-xl mb-4">
            Saving lives, one paw at a time - because every donation fuels hope
            and ensures a brighter future for our furry friends{" "}
          </div>
          <Button className="">Donate Now</Button>
        </div>
        <div>
          <img src={donate} className="h-80 m-auto" />
        </div>
      </div>
      <div className="mt-8 bg-black py-4 pt-12">
        <div className="max-w-7xl grid grid-cols-3 place-content-center text-white m-auto">
          <div className="w-full flex justify-center">
            <div className="m-auto flex flex-col gap-2 text-gray-50">
                <div className="font-bold text-lg">Features</div>
              <div>Adopt a Pet</div>
              <div>Rehome a Pet</div>
              <div>Know about animals</div>
              <div>Our Chatbot</div>
            </div>
          </div>
          <div className="w-full flex justify-cente items-start">
            <div className="mx-auto mb-auto flex flex-col gap-2 text-gray-50">
                <div className="font-bold text-lg">Organisation</div>
              <div>About us</div>
              <div>Sponsor us</div>
            </div>
          </div>
          <div className="w-full flex justify-cente items-start">
            <div className="mx-auto mb-auto flex flex-col gap-2 text-gray-50">
                <div className="font-bold text-lg">Socials</div>
              <div>Youtube</div>
              <div>DevFolio</div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Home;
