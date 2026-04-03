import { useState, useEffect } from "react";
import { OrderFormData } from "../App";

function Checkout({ checkout }: { checkout: (data: OrderFormData) => void }) {

  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [collectionTime, setCollectionTime] = useState("");

  useEffect(() => {
    const fetchTimeSlots = async () => {
      const response = await fetch("/api/get_timeslots");
      const slots: string[] = await response.json();
      setTimeSlots(slots);
    };
    fetchTimeSlots().catch(console.error);
  }, []);

  function handleCheckout() {
    checkout({
      customer_name: `${firstName} ${lastName}`,
      email,
      phone,
      timeslot: collectionTime,
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form className="space-y-8">
        {/* Your Details */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input type="text"
                       id="firstName"
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                       required={true}/>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input type="text"
                       id="lastName"
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                       required={true}/>
              </div>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <input type="text"
                     id="phoneNumber"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     required={true}/>
            </div>
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input type="text"
                     id="emailAddress"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
                     required={true}/>
            </div>
          </div>
        </div>

        {/* Collection Time */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Collection Time</h2>
          <div>
            <label htmlFor="collectionTime" className="block text-sm font-medium text-gray-700 mb-1">
              Select a collection time
            </label>
            <select
              id="collectionTime"
              name="collectionTime"
              value={collectionTime}
              onChange={(e) => setCollectionTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {new Date(time).toLocaleString([], { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Place Order */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <button
            type="button"
            className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleCheckout}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}

export default Checkout;
