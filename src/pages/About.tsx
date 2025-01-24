import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* About the App Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-white mt-24">About ShowGo.</h1>
        <div className="text-center">
          <p className="text-lg text-gray-400 mb-4 leading-8">
            ShowGo is a comprehensive ticketing platform designed to streamline the way events are
            organized, attended, and managed. Whether you're an attendee searching for exciting events
            or an organizer looking to host your next big show, ShowGo makes the entire process simple,
            efficient, and enjoyable.
          </p>
          <p className="text-lg text-gray-400 mb-4 leading-8">
            Our platform is built with the goal of providing seamless and secure ticketing solutions
            for both attendees and event organizers. From easy event browsing to straightforward ticket
            booking, ShowGo aims to enhance the way people experience live events.
          </p>
          <p className="text-lg text-gray-400 mb-4 leading-8">
            At ShowGo, we believe that every event should be a memorable experience. Our team is dedicated
            to providing the best technology to ensure that both organizers and attendees get the most out
            of every interaction. We strive to create a platform that not only simplifies event management
            but also fosters a vibrant community of event-goers.
          </p>
        </div>
      </div>

      {/* Full Screen Image Section after the "About ShowGo" section */}
      {/* <div className="relative mb-12">
        <img
          src="/images/showgo-background.jpg" // Replace with your image path
          alt="ShowGo Background"
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 rounded-lg" />
      </div> */}

      {/* For Attendees Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">For Attendees</h2>
        <div className="text-center">
          <p className="text-gray-400 leading-7 mb-4">
            ShowGo makes it easy for attendees to find and book tickets for events they love. Whether
            it's a concert, a sports match, or a theater performance, our platform offers a wide variety
            of events across different genres. You can easily browse events, select tickets, and make secure
            payments all in one place.
          </p>
          <p className="text-gray-400 leading-7 mb-4">
            We prioritize providing a seamless and user-friendly experience, allowing you to find the
            best events near you and make bookings effortlessly. You can also stay updated on new events
            and offers by subscribing to our newsletter.
          </p>
          <p className="text-gray-400 leading-7">
            ShowGo is more than just a ticketing platform — it’s your personal event guide. Enjoy your
            favorite experiences with peace of mind, knowing that your tickets are in safe hands.
          </p>
        </div>
      </div>

      {/* For Event Organizers Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">For Event Organizers</h2>
        <div className="text-center">
          <p className="text-gray-400 leading-7 mb-4">
            Organizing an event with ShowGo is straightforward and stress-free. Our platform allows
            organizers to create, manage, and promote events with ease. You can set up event pages,
            manage ticket listings, and track sales in real-time.
          </p>
          <p className="text-gray-400 leading-7 mb-4">
            ShowGo also provides tools to help you reach a wider audience by offering features like
            event promotion and social media sharing. We aim to help you build a successful event
            with maximum attendance.
          </p>
          <p className="text-gray-400 leading-7">
            With ShowGo, you can focus on the creative and logistical aspects of your event while
            we take care of the ticketing. Our platform ensures that ticket sales and attendee management
            are seamless, so you can provide a smooth experience for your audience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
