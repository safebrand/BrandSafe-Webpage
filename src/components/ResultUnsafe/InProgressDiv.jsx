import { unsafePageStyles } from "../../styles/ResultsUnsafePage";

export function InProgressDiv() {
  return (
    <div className=" w-[970px] h-[313px] rounded-[12px] bg-[#FFEBEB] pt-[40px] pl-[90px] ml-[121px]">
      {" "}
      <h2 className={`${unsafePageStyles.inProgressHeadStyle}`}>In Progress</h2>
    </div>
  );
}
