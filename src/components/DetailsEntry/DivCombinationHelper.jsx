import { LeftSideDiv } from "./LeftSideDiv";
import { RightSideDiv } from "./RightSideDiv";

export function DivCombinationHelper() {
  return (
    <section className="h-screen w-screen flex">
      <LeftSideDiv />
      <div className="flex items-center">
        <div className="h-[50vh] w-[2px] bg-[#02C3FF]"></div>
      </div>
      <RightSideDiv />
    </section>
  );
}
