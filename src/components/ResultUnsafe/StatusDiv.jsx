import { statusData } from "../../constants/UnsafePageData";
import { unsafePageStyles } from "../../styles/ResultsUnsafePage";

export function StatusDiv() {
  return (
    <div className="ml-[121px] flex flex-col gap-y-[20px]">
      <h2 className={`${unsafePageStyles.statusHeadStyle}`}>Status</h2>
      <select
        className="w-[950px] px-[20px] text-[22px] font-[400]"
        name="cars"
        id="cars"
      >
        <option className="text-[22px] font-[400]" value="volvo">
          www.assertify.me
        </option>
        <option className="text-[22px] font-[400]" value="saab">
          www.assertify.me
        </option>
        <option className="text-[22px] font-[400]" value="mercedes">
          www.assertify.me
        </option>
        <option className="text-[22px] font-[400]" value="audi">
          www.assertify.me
        </option>
      </select>
      <div className=" w-[970px] h-[313px] rounded-[12px] bg-[#FFEBEB] pt-[40px] pl-[90px] ">
        <h2 className={`${unsafePageStyles.statusHeadStyle}`}>Threats Found</h2>
        <div className="grid grid-rows-3 grid-cols-2 space-y-[20px] mt-[20px]">
          {statusData.map((link) => (
            <div
              className="flex items-center gap-[22px] h-[42px] mt-[20px]"
              key={link.id}
            >
              <h2 className={`${unsafePageStyles.statusSideHeadStyle}`}>
                {link.website}
              </h2>
              <button className="text-[#FFFFFF] font-[400] w-[160px] h-[42px] rounded-[57px] flex items-center justify-center bg-[#2F2F2F] text-[24px]">
                Take Action
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
