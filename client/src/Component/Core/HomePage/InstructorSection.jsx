import React from 'react'
import CTAButton from "../../../Component/Core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../Asset/Image/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div className="py-8 px-4 sm:px-6 md:px-8 w-full">
      <div className="flex flex-col lg:flex-row gap-10 md:gap-20 items-center w-full">
        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={Instructor}
            alt="Instructor"
            className="shadow-white shadow-[-20px_-20px_0_0] max-w-[320px] md:max-w-[400px] w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-[50%] flex gap-6 md:gap-10 flex-col items-center lg:items-start">
          <h1 className="text-3xl md:text-4xl font-semibold text-center lg:text-left w-full">
            Become an <HighlightText text={"instructor"} />
          </h1>
          <p className="font-medium text-[16px] text-justify w-full text-richblack-300">
            Instructors from around the world teach millions of students on ShikshaSutra. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit mx-auto lg:mx-0">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection