import React from 'react'

const HeadingDescription = ({heading,description}) => {
  return (
    <div className="p-4 flex flex-col  bg-gray-100 h-[88px]">
        <h1 className="text-[22px] text-[#000000DE]">{heading}</h1>
        <p className="text-md text-[#9f9f9f]">{description}</p>
      </div>
  )
}

export default HeadingDescription