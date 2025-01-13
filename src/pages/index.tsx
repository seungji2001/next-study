//css module을 사용하지 
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css" //import css 안된다. //객체로 변환하여 호출하는 방향으로 한다
import { ReactNode } from "react";
export default function Home() { //default이다.
  return (<>
  <h1 className={style.h1}>인덱스</h1>
  <h2 className={style.h2}>h2</h2>
  </>);
}

//home component에 getLayout이라는 메서드를 추가, 그리고 ReactNode타입의 page를 파라미터로 받음
//Home.getLayout을 명시하고 리턴 값을 레이아웃에 설정 할 경우, app.tsx에서 이를 꺼내서 사용이 가능하다
//const getlayout = Component.getLayout
Home.getLayout = (page: ReactNode) =>{
  return <SearchableLayout>{page}</SearchableLayout>
}