import React from "react";

const Button = ({ styles, name, click }) => {
  return (
    <button
      onClick={click}
      type="submit"
      className={`py-4 px-6 font-poppins font-medium text-[15px] text-primary outline-none rounded-[10px] bg-gradient-to-r from-indigo-300 to-indigo-500 ${styles}`}
    >
      {name === "" ? " Get Started" : name}
    </button>
  );
};

export default Button;
