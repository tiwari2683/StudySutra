import { useState } from "react"
import { useDropzone } from "react-dropzone"

export default function Upload({ label = "Course Thumbnail", onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setSelectedFile(file)
      if (onFileSelect) {
        onFileSelect(file)
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5 uppercase tracking-wider">
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div {...getRootProps()} className="flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 bg-richblack-700">
        <input {...getInputProps()} />
        <div className="flex w-full flex-col items-center p-6">
          <p className="mt-2 max-w-[200px] text-center text-xs text-richblack-200 uppercase tracking-wider">
            Drag and drop an image, or click to <span className="font-semibold text-yellow-50">BROWSE</span> a file
          </p>
          {selectedFile && <p className="mt-2 text-xs text-richblack-100">Selected file: {selectedFile.name}</p>}
          <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200 uppercase tracking-wider">
            <li>Aspect ratio 16:9</li>
            <li>Recommended size 1024x576</li>
          </ul>
        </div>
      </div>
    </div>
  )
}