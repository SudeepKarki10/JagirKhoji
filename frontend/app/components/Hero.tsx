import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="py-12 text-white">
      <h1 className="text-5xl font-extrabold text-center">
        Find Your Next <br /> Job Here
      </h1>

      <div className="text-md  text-center mt-4 mx-8 sm:mx-16 md:mx-24 lg:mx-36 text-zinc-300">
        Are you looking for the perfect job or ideal candidate? Find your dream
        Job with thousands of postings accross industries.
      </div>

      <form className="flex  justify-center items-center  gap-2 pt-12">
        <input
          type="text"
          placeholder=" Search jobs..."
          className="border-2 border-gray-300 border-r-2 rounded-md  px-2 py-2  w-8/12 sm:w-8/12 md:4/12 lg:w-7/12"
        />

        <button className="bg-blue-600 text-white rounded-md px-2 py-2 w-max">
          search
        </button>
      </form>

      <div className="flex flex-row justify-center items-center gap-4 h-20">
        <p className="font-base text-zinc-300"> 1000+ Jobs </p>

        <div className="flex flex-row gap-0">
          <Image
            src="/amazon.png"
            width={40}
            height={20}
            alt="Picture of the sponsers"
          />{" "}
          <Image
            src="/google.png"
            width={40}
            height={20}
            alt="Picture of the sponsers"
          />
          <Image
            src="/atlas.png"
            width={40}
            height={20}
            alt="Picture of the sponsers"
          />
          <Image
            src="/microsoft1.png"
            width={40}
            height={20}
            alt="Picture of the sponsers"
          />
          <Image
            src="/intel.png"
            width={40}
            height={20}
            alt="Picture of the sponsers"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
