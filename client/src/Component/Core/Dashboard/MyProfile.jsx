import React from 'react'
import IconBtn from '../../Common/IconBtn'
import { RiEditBoxLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formattedDate } from "../../../Util/dateFormatter"

const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.profile)

  return (
    <div className='bg-gradient-to-br from-purple-900 via-gray-800 to-blue-900 text-white mx-0 md:mx-5 relative min-h-screen p-6'>
      <h1 className='font-medium text-richblack-5 text-3xl mb-7 md:mb-14 tracking-wide animate-pulse'>My Profile</h1>

      <div className='flex items-center justify-between rounded-xl border border-indigo-400 bg-richblack-800/50 p-8 px-3 md:px-12 relative shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='flex flex-row gap-x-2 md:gap-x-4 items-center'>
          <div>
            <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[60px] md:w-[78px] rounded-full object-cover border-2 border-indigo-300' />
          </div>
          <div className='space-y-1'>
            <h2 className='text-lg font-semibold text-richblack-5'>{user?.firstName} {user?.lastName}</h2>
            <p className='text-sm text-richblack-300'>{user?.email}</p>
          </div>
        </div>
        <IconBtn
          customClasses="z-30 bg-yellow-50 text-richblack-900 font-bold px-4 py-2 rounded-md hover:bg-yellow-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          text={'Edit'}
          onClickHandler={() => navigate('/dashboard/settings')}
          children={<RiEditBoxLine className="text-lg" />}
        />
      </div>

      <div className='md:hidden relative'>
        <IconBtn
          text={'Edit Profile'}
          onClickHandler={() => navigate('/dashboard/settings')}
          customClasses="w-full my-5 !py-2 text-center grid place-items-center z-30 bg-yellow-50 text-richblack-900 font-bold rounded-md hover:bg-yellow-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          children={<RiEditBoxLine className="text-lg" />}
        />
      </div>

      <div className='flex flex-col gap-y-10 my-7 md:my-10 rounded-xl border border-indigo-400 p-8 px-3 md:px-12 bg-richblack-800/50 relative shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-richblack-5'>About</h2>
          <IconBtn
            text={'Edit'}
            customClasses="z-30 bg-yellow-50 text-richblack-900 font-bold px-4 py-2 rounded-md hover:bg-yellow-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            onClickHandler={() => navigate('/dashboard/settings')}
            children={<RiEditBoxLine className="text-lg" />}
          />
        </div>
        <p className={`${user?.profile?.about ? 'text-richblack-5' : 'text-richblack-400'} text-sm font-medium animate-fade-in`}>{user?.profile?.about || 'Write Something About Yourself'}</p>
      </div>

      <div className='flex flex-col gap-y-5 md:gap-y-10 rounded-xl border border-indigo-400 p-8 px-3 md:px-12 bg-richblack-800/50 relative shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <div className='flex items-center justify-between w-full'>
          <h2 className='text-lg font-semibold text-richblack-5'>Personal Details</h2>
          <IconBtn
            text={'Edit'}
            customClasses="z-30 bg-yellow-50 text-richblack-900 font-bold px-4 py-2 rounded-md hover:bg-yellow-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            onClickHandler={() => navigate('/dashboard/settings')}
            children={<RiEditBoxLine className="text-lg" />}
          />
        </div>

        <div className='flex flex-col md:flex-row gap-y-5'>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>First Name</p>
            <p className='text-sm text-richblack-5 font-medium'>{user?.firstName}</p>
          </div>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
            <p className='text-sm text-richblack-5 font-medium'>{user?.lastName}</p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-y-5'>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Email</p>
            <p className='text-sm text-richblack-5 font-medium'>{user?.email}</p>
          </div>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
            <p className={`text-sm font-medium ${user?.profile?.contactNumber ? 'text-richblack-5' : 'text-richblack-400'}`}>{user?.profile?.contactNumber ?? 'Add Contact Number'}</p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-y-5'>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Gender</p>
            <p className={`text-sm font-medium ${user?.profile?.gender ? 'text-richblack-5' : 'text-richblack-400'}`}>{user?.profile?.gender ?? 'Add Gender'}</p>
          </div>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Date of Birth</p>
            <p className={`text-sm font-medium ${user?.profile?.dob ? 'text-richblack-5' : 'text-richblack-400'}`}>{user?.profile?.dob ? formattedDate(user?.profile?.dob) : 'Add Date of Birth'}</p>
          </div>
        </div>
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

export default MyProfile