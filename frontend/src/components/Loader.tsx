const Loader = () => {
  return (
    <div
      id="wifi-loader"
      className="w-16 h-16 rounded-full relative flex justify-center items-center"
    >
      <svg className="circle-outer w-20 h-20 absolute" viewBox="0 0 86 86">
        <circle className="back" cx="43" cy="43" r="40"></circle>
        <circle className="front" cx="43" cy="43" r="40"></circle>
        <circle className="new" cx="43" cy="43" r="40"></circle>
      </svg>
      <svg className="circle-middle w-15 h-15 absolute" viewBox="0 0 60 60">
        <circle className="back" cx="30" cy="30" r="27"></circle>
        <circle className="front" cx="30" cy="30" r="27"></circle>
      </svg>
      <svg className="circle-inner w-8 h-8 absolute" viewBox="0 0 34 34">
        <circle className="back" cx="17" cy="17" r="14"></circle>
        <circle className="front" cx="17" cy="17" r="14"></circle>
      </svg>
    </div>
  );
};

export default Loader;