import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css"; //기본 스타일
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
//Component -> page
//pageProps -> 모든 Props 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps}></Component>
    </GlobalLayout>
  )
}
//root component
//모든 페이지들의 부모 컴포넌트를 의미한다