import { FC } from "react";

interface IAuthButtonsProps {
  onClick?: () => void;
  text: string;
  icon: string;
}

const AuthButtons: FC<IAuthButtonsProps> = ({ onClick, text, icon }) => {
  return (
    <button
      className="w-[100%] border-[2px] border-gray-600 p-1.5 rounded-[4px] hover:bg-gray-700 text-gray-300 hover:text-white"
      onClick={onClick}
    >
      <div className="flex gap-2 justify-center">
        <img src={icon} alt="authentication method icon" className="w-5" />
        <span className="text-sm font-normal">{text}</span>
      </div>
    </button>
  );
};

export default AuthButtons;
