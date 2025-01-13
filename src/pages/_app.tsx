import "@/styles/globals.css"; //기본 스타일
import type { AppProps } from "next/app";

//Component -> page
//pageProps -> 모든 Props 
export default function App({ Component, pageProps }: AppProps) {
  //pageProps를 모두 흩뿌려서 전달하고 있다
  return <>
    <header>글로벌 헤더</header>
    <Component {...pageProps} />
  </>;
}
//root component
//모든 페이지들의 부모 컴포넌트를 의미한다