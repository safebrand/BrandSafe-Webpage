import { ContentUnsafeDiv } from "../../components/ResultUnsafe/ContentUnsafeDiv";

import { SideBar } from "../../components/shared/SideBar/SideBar";

export default function ResultUnsafe() {
  return (
    <section className="flex">
      <SideBar />
      <ContentUnsafeDiv />

      {/* <ContentSafeDiv /> */}
    </section>
  );
}
