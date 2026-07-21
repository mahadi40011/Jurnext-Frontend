import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        font-medium
        transition-all
        duration-200
        select-none
        overflow-hidden
        w-full
        cursor-pointer
        disabled:opacity-60
        disabled:cursor-not-allowed
        disabled:shadow-none

        /* Outline vs Filled Variant Styles */
        ${
          outline
            ? "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 shadow-sm"
            : "bg-lime-600 hover:bg-lime-700 text-white border-2 border-lime-600 hover:border-lime-700 shadow-lg shadow-lime-600/20"
        }

        /* Small vs Regular Size Styles */
        ${small ? "text-xs py-2 px-3.5 font-semibold" : "text-sm sm:text-base py-3.5 px-6 font-bold"}
      `}
    >
      {/* Icon Display (Left Aligned with smooth vertical centering) */}
      {Icon && (
        <Icon
          size={small ? 16 : 20}
          className={`
            transition-transform duration-200
            ${Icon ? "shrink-0" : ""}
            ${outline ? "text-gray-700" : "text-white"}
          `}
        />
      )}

      {/* Button Label */}
      <span className="tracking-wide">{label}</span>
    </motion.button>
  );
};

export default Button;
