import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
interface DialogProps {
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  isOpen: boolean;
  close: () => void;
  element: React.ReactNode;
  title?: string;
}

const Dialog: React.FC<DialogProps> = ({
  size = "md",
  isOpen,
  close,
  element,
  title,
}) => {
  const sizeClasses: Record<string, string> = {
    sm: "max-w-sm min-w-[24rem]",
    md: "max-w-md min-w-[28rem]",
    lg: "max-w-lg min-w-[32rem]",
    xl: "max-w-xl min-w-[36rem]",
    xxl: "max-w-2xl min-w-[85rem]",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999999] top-0 bg-transparent bg-opacity-50">
      <div
        className={`bg-white rounded-lg p-6 shadow-lg overflow-auto ${sizeClasses[size]} max-h-[90vh] relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="text-[16px] font-open-sans font-[600]  ">{title}</div>
        )}
        {element}
        <div className="absolute top-4 right-4">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={close}
            className="cursor-pointer px-2.5 py-2 text-[24px] text-[#1B1B1B] font-extralight"
          />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
