import "@/styles/globals.css"; //기본 스타일
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
//Component -> page
//pageProps -> 모든 Props 
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () =>{
    router.push("/test");
  }
  //pageProps를 모두 흩뿌려서 전달하고 있다
  return <>
    <header>
      <Link href={"/"}>index</Link>
      &nbsp;
      <Link href={"/search"}>search</Link>
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