import { ArrowRightLeft, Users, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const trendingEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "2024-07-15",
    price: "15000",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Divine Concert",
    date: "2024-06-20",
    price: "12000",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    title: "AP Dhillon Live",
    date: "2024-08-10",
    price: "18000",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Rock Festival",
    date: "2024-09-05",
    price: "20000",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=300&fit=crop"
  }
];

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Snap Tickets,<br />Share Moments
          </motion.h1>
          <Button 
            size="lg" 
            className="bg-black hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 border border-white/10 transition-all duration-500 ease-in-out hover:scale-105"
            onClick={() => {
              const transferSection = document.getElementById('transfer');
              if (transferSection) {
                const offset = 0; // Adjust this value based on your header height if needed
                const elementPosition = transferSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            DIVE IN
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-0 bg-black">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <ArrowRightLeft className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transfer Your Ticket</h3>
            <p className="text-gray-400">Can't make it to the show? Easily transfer your ticket to a friend and never waste a ticket again.</p>
          </div>
          <div className="text-center">
            <Tag className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sell Your Ticket</h3>
            <p className="text-gray-400">If plans change, you can also sell your ticket directly through our platform, and we'll handle the details.</p>
          </div>
          <div className="text-center">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Group Bookings</h3>
            <p className="text-gray-400">Book with friends and keep track of everyone's plans.</p>
          </div>
        </div>
      </section>

      {/* Discover Section
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white/10 rounded-lg p-8">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop" 
                alt="Concert"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Discover Concerts Tailored Just for You!
            </h2>
            <p className="text-gray-400 mb-6">
              Connect your Spotify account, and receive concert recommendations based on the artists you listen to the most.
            </p>
            <Button>Learn More</Button>
          </div>
        </div>
      </section> */}

      {/* Trending Events
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Events:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingEvents.map((event) => (
              <Card key={event.id} className="bg-gray-900 border-gray-800">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{event.date}</p>
                  <p className="text-white font-bold">₹{event.price}</p>
                  <Button className="w-full mt-4">Book Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Transfer Ticket Section */}
      <section id="transfer" className="py-20 bg-gradient-to-b from-black to-black-900">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold mb-6">
        Effortless Ticket Transfers <br />
        </h2>
        <p className="text-gray-400 text-lg mb-8">
        Can't attend the show? No worries! With our seamless ticket transfer feature, you can ensure your ticket doesn't go to waste.
        </p>
        {/* <Button size="lg">Explore</Button> */}
      </div>
      <img 
        src="/src/assets/transfer_gif.gif" 
        alt="Transfer Ticket GIF"
        className="w-full rounded-lg shadow-2xl"
      />
    </div>
  </div>
</section>

{/* Sell Ticket Section */}
<section className="py-20 bg-black">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="bg-white/5 rounded-2xl p-6">
        <img 
          src="/src/assets/sell_gif.gif" 
          alt="Sell Ticket GIF"
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
      <div>
        <h2 className="text-4xl font-bold mb-6">
        Quick and Secure Resale<br />
        </h2>
        <p className="text-gray-400 text-lg mb-8">
        Plans changed? Don’t worry—sell your ticket securely and help another fan enjoy the event.
        </p>
        {/* <Button size="lg">Explore</Button> */}
      </div>
    </div>
  </div>
</section>

      {/* Group Booking Section */}
      <section className="py-20 bg-black">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold mb-6">
          Stay Connected, Plan Together<br /> 
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Coordinate with friends, stay updated, and share plans all in one place. It’s never been this easy.
        </p>
        {/* <Button size="lg">Explore</Button> */}
      </div>  
        <img 
          src="/src/assets/group_gif.gif" 
          alt="Group Booking GIF"
          className="w-full rounded-lg shadow-2xl"
        />
    </div>
  </div>
</section>
    </div>
  );
}  