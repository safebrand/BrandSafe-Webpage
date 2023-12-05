import { ContentSafeDiv } from "../../components/ResultSafe/ContentSafeDiv";
import { SideBar } from "../../components/shared/SideBar/SideBar";

export default function ResultSafe() {
  return (
    <section className="flex">
      <SideBar />
      <ContentSafeDiv />
    </section>
  );
}
