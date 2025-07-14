import React from 'react'
import { FaStar, FaUserCircle } from 'react-icons/fa'
import { formatDate } from '../../../Service/formatDate'

const CourseReviews = ({ reviews, avgRating }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="my-8 border border-richblack-600 rounded-lg p-8 bg-richblack-700">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FaStar className="text-4xl text-richblack-400" />
          </div>
          <h3 className="text-2xl font-semibold text-richblack-5 mb-2">No Reviews Yet</h3>
          <p className="text-richblack-300">Be the first to review this course!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-8 border border-richblack-600 rounded-lg p-8 bg-richblack-700">
      {/* Reviews Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-richblack-5 mb-2">Student Reviews</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-yellow-50">{avgRating.toFixed(1)}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-lg ${
                      star <= avgRating ? 'text-yellow-50' : 'text-richblack-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-richblack-300">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        </div>
        
        {/* Rating Distribution */}
        <div className="mt-4 md:mt-0">
          <div className="text-sm text-richblack-300 mb-2">Rating Distribution</div>
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(review => review.rating === rating).length
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
              
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs text-richblack-400 w-4">{rating}★</span>
                  <div className="flex-1 bg-richblack-600 rounded-full h-2">
                    <div 
                      className="bg-yellow-50 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-richblack-400 w-8">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={review._id || index} className="border-b border-richblack-600 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                {review.user?.image ? (
                  <img
                    src={review.user.image}
                    alt={`${review.user.firstName} ${review.user.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-richblack-600 flex items-center justify-center">
                    <FaUserCircle className="text-2xl text-richblack-400" />
                  </div>
                )}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-richblack-5">
                    {review.user?.firstName} {review.user?.lastName}
                  </h4>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-sm ${
                          star <= review.rating ? 'text-yellow-50' : 'text-richblack-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-richblack-400">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                
                <p className="text-richblack-200 leading-relaxed">
                  {review.review}
                </p>

                {/* Review Tags */}
                {review.rating >= 4 && (
                  <div className="mt-3">
                    <span className="inline-block bg-green-900 text-green-100 text-xs px-2 py-1 rounded-full">
                      ⭐ Highly Recommended
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button (if there are more reviews) */}
      {reviews.length > 5 && (
        <div className="text-center mt-6">
          <button className="text-yellow-50 hover:text-yellow-100 font-medium transition-colors duration-200">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}

export default CourseReviews 