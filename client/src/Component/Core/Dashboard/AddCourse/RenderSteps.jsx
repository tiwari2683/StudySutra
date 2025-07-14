import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

const RenderSteps = () => {

  const { step } = useSelector((state) => state.course)


  const steps = [
    {
      id: 1,
      title: 'Course Information'
    },
    {
      id: 2,
      title: 'Course Builder'
    },
    {
      id: 3,
      title: 'Publish'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="relative">
        <div className='flex w-full justify-center mb-4' >
          {
            steps.map((item) => (
              <Fragment key={item.id}>
                <div className={`relative grid place-items-center aspect-square rounded-full w-[50px] border-2 select-none transition-all duration-300 ease-in-out
                  ${item.id < step && "bg-yellow-50 text-richblack-900 border-yellow-50 shadow-lg shadow-yellow-50/25"}
                  ${item.id === step && "border-yellow-50 bg-yellow-900 text-yellow-50 shadow-lg shadow-yellow-50/25"}
                  ${item.id > step && "border-richblack-600 bg-richblack-800 text-richblack-400"}
                `} >
                  {
                    item.id < step ? <FaCheck className='font-bold text-richblack-900' /> : item.id
                  }
                </div>

                {
                  item.id !== steps.length && (
                    <>
                      <div className={`h-[2px] w-[calc(33%-25px)] border-b-2 transition-all duration-300 ease-in-out
                    ${item.id < step ? "border-yellow-50" : "border-richblack-600"}
                    `} >
                      </div>
                    </>
                  )
                }
              </Fragment>
            ))
          }
        </div>

        <div className='mb-8'>
          <div className='hidden md:flex justify-between select-none' >
            {
              steps.map(item => (
                <div key={item.id} className={`min-w-[130px] text-center text-sm font-medium uppercase tracking-wider transition-all duration-300
                ${item.id <= step ? "text-richblack-5" : "text-richblack-500"}`} >
                  {item.title}
                </div>
              ))
            }
          </div>
        </div>

        <div className='md:hidden font-semibold mb-4 text-xl text-center text-richblack-5 bg-richblack-800 rounded-lg p-4 border border-richblack-700'>
          {step === 1 && "Course Information"}
          {step === 2 && "Course Builder"}
          {step === 3 && "Publish Course"}
        </div>
      </div>

      {/* Form Content */}
      <div className="animate-fade-in">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default RenderSteps