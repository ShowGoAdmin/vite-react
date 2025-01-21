import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function EventBookingPage() {
  const { id } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedSection, setSelectedSection] = useState('');

  // Mock event data
  const event = {
    title: "Summer Music Festival",
    date: "July 15, 2024",
    time: "7:00 PM",
    venue: "Central Park Arena",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=400&fit=crop",
    price: 15000,
    sections: [
      { id: 'vip', name: 'VIP', price: 25000, available: 50 },
      { id: 'premium', name: 'Premium', price: 15000, available: 100 },
      { id: 'general', name: 'General', price: 8000, available: 200 },
    ]
  };

  return (
    <div className="pt-16">
      {/* Event Hero */}
      <div className="relative h-[40vh]">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Ticket Selection */}
          <div>
            <Card className="p-6 bg-gray-900 border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Select Tickets</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Section</Label>
                  <RadioGroup 
                    value={selectedSection} 
                    onValueChange={setSelectedSection}
                    className="mt-2 space-y-2"
                  >
                    {event.sections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-800">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={section.id} id={section.id} />
                          <Label htmlFor={section.id}>{section.name}</Label>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{section.price}</div>
                          <div className="text-sm text-gray-400">{section.available} available</div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label>Number of Tickets</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={ticketCount}
                      onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                      className="w-20 text-center"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTicketCount(ticketCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div>
            <Card className="p-6 bg-gray-900 border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Tickets ({ticketCount}x)</span>
                  <span>₹{selectedSection ? 
                    event.sections.find(s => s.id === selectedSection)?.price! * ticketCount : 
                    0
                  }</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹500</span>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{selectedSection ? 
                      (event.sections.find(s => s.id === selectedSection)?.price! * ticketCount) + 500 : 
                      500
                    }</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg">
                Proceed to Payment
              </Button>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                <span>100+ people have booked this event</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}