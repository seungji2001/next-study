//css module을 사용하지 
import style from "./index.module.css" //import css 안된다. //객체로 변환하여 호출하는 방향으로 한다
export default function Home() { //default이다.
  return <>
  <h1 className={style.h1}>인덱스</h1>
  <h2 className={style.h2}>h2</h2>
  </>
}
