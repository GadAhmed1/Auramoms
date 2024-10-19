/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
function TheCardWithText(props) {
  let className = `mx-4 sm:mx-20 dark:text-white flex flex-col mt-10 sm:mt-20 gap-10 p-2 sm:flex-row sm:items-center sm:justify-between py-10`;

  if (props.reverse) {
    className += ' sm:flex-row-reverse';
  }

  return (
    <div className={className}>
      <div className="TheImage sm:w-1/2 flex justify-center">
        <img className="max-w-full h-auto" src={props.imageurl} alt="" />
      </div>
      <div className="text-center TheTxt mt-4 w-full sm:w-1/2 mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold">{props.maintitle}</h2>
        <br />
        <b className="text-lg sm:text-2xl font-normal">{props.title}</b>
      </div>
    </div>
  );
}

export default TheCardWithText;
