import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Landing = () => {
  // const IMAGE_URL = import.meta.env.VITE_CDN_IMAGE_URL
  const testimonials = [
    {
      name: "Aarav",
      testimonial:
        "EcoTrack has transformed the way I manage my energy consumption. Highly recommend!",
      rating: 5,
    },
    {
      name: "Vivaan",
      testimonial:
        "A fantastic tool for anyone looking to save energy and reduce their carbon footprint.",
      rating: 4,
    },
    {
      name: "Aditya",
      testimonial:
        "The insights provided by EcoTrack are invaluable. It's a must-have for eco-conscious individuals.",
      rating: 5,
    },
  ];
  return (
    <div>
      <Navbar />
      <section className="relative min-h-[600px] h-screen">
        {/* Hero Section */}
        <div className="absolute inset-0">
          <img
            src={`https://cdn-85t93yhaveqs.vultrcdn.com/hero.png`}
            alt="Hero"
            className="h-full w-full object-cover brightness-[0.7]"
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-[90%] md:max-w-2xl lg:max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Your Power to Save Energy, Our Impact to Save Earth
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 px-4">
              Track your energy consumption, optimize efficiency, and make a
              meaningful difference for the planet
            </p>
            <Button size="lg" className="text-base sm:text-lg px-8" asChild>
              <a href="/signup">Get Started</a>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section>
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature cards */}
            <div className="flex flex-col items-center p-4 transition-transform hover:scale-105">
              <img
                src={`https://cdn-85t93yhaveqs.vultrcdn.com/landing-page-img-1.svg`}
                alt="Track Energy"
                className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-4"
              />
              <p className="text-base sm:text-lg font-semibold text-center">
                Track your energy
              </p>
            </div>
            <div className="flex flex-col items-center p-4 transition-transform hover:scale-105">
              <img
                src={`https://cdn-85t93yhaveqs.vultrcdn.com/landing-page-img-2.svg`}
                alt="Monitor Devices"
                className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-4"
              />
              <p className="text-base sm:text-lg font-semibold text-center">
                Monitor devices effortlessly
              </p>
            </div>
            <div className="flex flex-col items-center p-4 transition-transform hover:scale-105">
              <img
                src={`https://cdn-85t93yhaveqs.vultrcdn.com/landing-page-img-3.svg`}
                alt="Optimize and Save"
                className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-4"
              />
              <p className="text-base sm:text-lg font-semibold text-center">
                Optimize and Save
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12 sm:py-10 lg:py-15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Introducing EcoTrack
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Join our community and experience the benefits of sustainable
              technology today!
            </p>
            <Button className="bg-[#34f853] text-black hover:bg-[#2ce048] transition-colors" asChild>
              <a href="/signup">Join Now</a>
            </Button>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src={`https://cdn-85t93yhaveqs.vultrcdn.com/landingimg1.svg`}
              alt="EcoTrack Features"
              className="w-full max-w-[400px] h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <img
              src={`https://cdn-85t93yhaveqs.vultrcdn.com/landingimg2.svg`}
              alt="Data Security"
              className="w-full max-w-[400px] h-auto"
            />
          </div>
          <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              All your work is safe with us
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              We take your data security seriously, which is why we use advanced
              encryption protocols to protect your files in the cloud. Your data
              is safe and secure with us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Reduce your carbon footprint in a smart way
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Powerful tool that helps you reduce your carbon footprint and save
              money on your business operations. With advanced analytics and
              optimization algorithms, EcoTrack analyzes your existing workflows
              and identifies areas for improvement.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src={`https://cdn-85t93yhaveqs.vultrcdn.com/landingimg3.svg`}
              alt="Carbon Footprint"
              className="w-full max-w-[400px] h-auto"
            />
          </div>
        </div>
      </section>
      {/* testimnoials section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          What Our Users Say
        </h2>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-6">
          Our clients love EcoTrack and we want to share their experiences with
          you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border rounded-lg shadow-md h-full"
            >
              <p className="text-base sm:text-lg text-gray-600 text-center mb-4 flex-grow">
                "{item.testimonial}"
              </p>
              <p className="font-semibold text-lg">{item.name}</p>
              <div className="flex space-x-1 mt-2 mb-0">
                {Array.from({ length: item.rating }, (_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Landing;
