import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

//Suspense : Next 서버측에서 사전렌더링을 할 때 Suspense 내부의 요소는 미완성으로 두고 클라이언트 측에서 비동기 동작
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>로딩중...</div>}>
        <Searchbar />
      </Suspense>

      {children}
    </div>
  );
}
