import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../Context/AppContext"
import { assets } from "../assets/assets"
import RelatedDoctors from "../Components/RelatedDoctors";

function Appointment() {
  const {docId} = useParams();
  const {doctors, currencySymbol} = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const fetchDocInfor = async () => {
    const docInfo = doctors.find(doc => doc._id === docId) 
    setDocInfo(docInfo)
  }

  const getAvailableSlot = async () => {
    setDocSlots([]); // Reset slots

    let today = new Date(); // Getting current date

    for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today); // Copy of today's date
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date(); // Setting end time
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0); // End time is 9 PM

        // Setting start time for the day
        if (today.getDate() === currentDate.getDate()) {
            // For today, ensure the start time is after the current time
            if (currentDate.getHours() >= 10) {
                currentDate.setMinutes(Math.ceil(currentDate.getMinutes() / 30) * 30); // Round to the next 30-minute interval
            } else {
                currentDate.setHours(10, 0, 0, 0); // Start at 10:00 AM if before 10
            }
        } else {
            // For other days, start at 10:00 AM
            currentDate.setHours(10, 0, 0, 0);
        }

        let timeSlot = [];

        // Generating time slots
        while (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            timeSlot.push({
                datetime: new Date(currentDate),
                time: formattedTime,
            });

            // Increment time by 30 minutes
            currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        // Update slots
        setDocSlots((prev) => [...prev, timeSlot]);
    }
};


  useEffect(()=>{
    fetchDocInfor();

  }, [doctors, docId])

  useEffect(()=> {
    getAvailableSlot();
  }, [docInfo])


  useEffect(() =>{
    console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div>
      {/* ...................  Doctors Details ..................*/}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ............... Doctors infor: name, degree and experience ..................*/}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" /></p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>

          {/* ....................Doctor About .................... */}
          <div>
            <p className=" flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="" /></p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
            <p className="text-gray-500 font-medium mt-4">Appointement fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>

      {/* .............. Booking Slot .................. */}
<div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
  <p>Booking slots</p>
  <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
    {
      docSlots.length > 0 && docSlots.map((item, index) => (
        <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "" }`} key={index}> 
          <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
          <p>{item[0] && item[0].datetime.getDate()}</p>
        </div>
      ))
    }
  </div>
  <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
    {
      docSlots.length && docSlots[slotIndex].map((item, index) =>(
        <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-3 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"}`} key={index}>{item.time.toLowerCase()}</p>
      ))
    }
  </div>
  <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointement</button>
</div>

    {/* .............. Listing related Doctors  ........... */}
    <RelatedDoctors  docId={docId} speciality={docInfo.speciality}/>

    </div>
  )
}

export default Appointment
