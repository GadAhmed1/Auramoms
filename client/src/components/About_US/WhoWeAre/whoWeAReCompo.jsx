/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Part.js
import React from "react";

function Part({
  imageSrc,
  title,
  description,
  bgColor = "bg-white",
  borderColor = "border-gray-300",
}) {
  return (
    <div
      className={`Part p-4 flex flex-col items-center  ${bgColor} ${borderColor} rounded-lg`}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover mb-4"
      />
      <div className="TxtPa text-center">
        <h3 className="HeaderTitle text-lg md:text-xl font-semibold mb-4">
          {title}
        </h3>
        <p className="DisPar text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
}

export default Part;
