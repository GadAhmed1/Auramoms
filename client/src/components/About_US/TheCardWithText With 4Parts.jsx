/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
function TheCardWithText(props) {
  let ClassNameOne = `ALL mx-4 sm:mx-20 dark:text-white flex flex-col mt-10 sm:mt-20 gap-10 p-2 sm:flex-row sm:items-center sm:justify-between relative`;

  if (props.reverse) {
    ClassNameOne += ' sm:flex-row-reverse';
  }

  return (
    <div className={ClassNameOne}>
      <div className="text-center TheTxt mt-4 w-full sm:w-1/2">
        <h2 className="text-xl font-normal absolute top-0 left-0 mx-auto">WHAT MAKES US UNIQUE?</h2>
        <div className="TheFourParts grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 mt-16">
          <div>the luxury of high-end beauty and wellness tools with the accessibility of everyday use.</div>
          <div>Our collections, like BlissMoms Massage Collection, AuraMoms Hair Bliss, Glow Rituals, and AuraSkin Solutions, are crafted with the modern woman in mind.</div>
          <div>Inspired by European wellness traditions and cutting-edge beauty tech, AuraMoms brings a blend of elegance, functionality, and sustainability.</div>
          <div>We source eco-friendly materials and partner with innovative creators to ensure that our products are as kind to the planet as they are to your body.</div>
        </div>
      </div>
      <div className="TheImage sm:w-1/2 flex justify-center">
        <img src={props.imageurl} alt="" className="max-w-full h-auto" />
      </div>
    </div>
  );
}

export default TheCardWithText;
