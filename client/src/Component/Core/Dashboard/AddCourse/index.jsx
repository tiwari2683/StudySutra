import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex w-full items-start gap-x-6 lg:gap-x-8">
            <div className="flex flex-1 flex-col">
              <div className="mb-6 text-center lg:text-left">
                <h1 className="mb-3 text-4xl font-bold text-richblack-5 uppercase tracking-wider lg:text-5xl">
                  Add Course
                </h1>
                <p className="text-richblack-300 text-lg">
                  Create and publish your course to share knowledge with students
                </p>
              </div>
              <div className="flex-1">
                <RenderSteps />
              </div>
            </div>
            {/* Course Upload Tips */}
            <div className="sticky top-10 max-w-[400px] flex-1 rounded-xl border border-richblack-600 bg-gradient-to-br from-richblack-800 to-richblack-700 p-6 shadow-2xl hidden lg:block backdrop-blur-sm">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-richblack-5">Course Upload Tips</h3>
                </div>
                <p className="text-richblack-300 text-sm">
                  Follow these guidelines to create an engaging course
                </p>
              </div>
              <ul className="space-y-4 text-sm text-richblack-300 tracking-wide">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-50 flex-shrink-0"></div>
                  <span>Set the Course Price option or make it free.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-50 flex-shrink-0"></div>
                  <span>Standard size for the course thumbnail is 1024x576.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-50 flex-shrink-0"></div>
                  <span>Video section controls the course overview video.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-50 flex-shrink-0"></div>
                  <span>Course Builder is where you create & organize a course.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-50 flex-shrink-0"></div>
                  <span>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-50 flex-shrink-0"></div>
                  <span>Information from the Additional Data section shows up on the course single page.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-50 flex-shrink-0"></div>
                  <span>Make Announcements to notify any important notes to all enrolled students at once.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
