import "@/styles/globals.css"; //기본 스타일
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
//Component -> page
//pageProps -> 모든 Props 
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () =>{
    router.push("/test"); //별도의 작업 해야함(onclick의 경우) link의 경우 자동으로 프리패칭 되지만 onclick은 안된다
  }

  useEffect(()=>{
    router.prefetch('/test') //마운트 이후, 프리패칭을 수행
  },[])

  //pageProps를 모두 흩뿌려서 전달하고 있다
  return <>
    <header>
      <Link href={"/"}>index</Link> 
      &nbsp;
      <Link href={"/search"} prefetch={false}>search</Link>
      &nbsp;
      <Link href={"/book/1"}>book</Link>

      <div>
        <button onClick={onClickButton}>/test page 이동</button>
      </div>
    </header>
    <Component {...pageProps} />
  </>;
}
//root component
//모든 페이지들의 부모 컴포넌트를 의미한다