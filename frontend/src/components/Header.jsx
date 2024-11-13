import { FaCartArrowDown } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import { GrLanguage } from "react-icons/gr";
import Link from "next/link";
export const Header = () => {
  return (
    <div className="w-full h-[80px]  flex items-center">
      <div className=" flex justify-between w-screen px-20">
        <div>lgo</div>
        <div className="flex  items-center gap-6">
          <div className="">
            <FaCartArrowDown className="w-[30px] h-[30px]" />
          </div>
          <div>
            <IoMdHeartEmpty className="w-[30px] h-[30px]" />
          </div>
          <div className="flex  items-center">
            <GrLanguage className="w-[20px] h-[20px]" />
            <select name="" id="" className="w-auto h-6">
              <option value="">english</option>
              <option value="">mongolia</option>
            </select>
          </div>
          <button className="rounded-lg  text-white font-bold bg-blue-700 flex items-center gap-2 px-4">
            <FcBusinessman className="w-10 h-10" />
            <Link className="" href={"/add"}>
              <div className="font-extrabold">Login</div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
