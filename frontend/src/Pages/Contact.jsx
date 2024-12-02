import { assets } from "../assets/assets"

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
      </div>
      <div className="my-10 flex flex-col sm:flex-row justify-center gap-10 mb-28 text-sm">
        <img className="w-full max-w-[360px]" src={assets.contact_image} alt="" />
      
      <div className="flex flex-col justify-center items-start gap-6">
        <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
        <p className="text-gray-500">#3 Ezimba street <br />Aba, Abia State  Nigeria</p>
        <p className="text-gray-500">Tel: +2349015951860 <br />Email: techiegold101@gmail.com</p>
        <p className="font-semibold text-lg text-gray-600">CAREERS AT DOCTORLY</p>
        <p className="text-gray-500">Learn more about our teams and job openings.</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
      </div>
      </div>
      
    </div>
  )
}

export default Contact
