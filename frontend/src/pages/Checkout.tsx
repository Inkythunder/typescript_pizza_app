import { useState, useEffect } from "react";

function Checkout(){

  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  useEffect(() => {
    const fetchTimeSlots = async () => {
      const response = await fetch("/api/get_timeslots");
      const slots: string[] = await response.json();
      setTimeSlots(slots);
    };
    fetchTimeSlots().catch(console.error);
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md flex gap-6 items-center">
      <form>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input type="text"
                     id="firstName"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     required={true}/>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input type="text"
                     id="lastName"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     required={true}/>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <input type="text"
                     id="phoneNumber"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     required={true}/>
            </div>
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input type="text"
                     id="emailAddress"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     required={true}/>
            </div>
            <div>
              <label htmlFor="collectionTime" className="block text-sm font-medium text-gray-700 mb-1">
                Collection Time
              </label>
              <select
                id="collectionTime"
                name="collectionTime"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout;