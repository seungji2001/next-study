import GlobalLayout from "@/components/global-layout";
import SearchableLayout from "@/components/searchable-layout";
import "@/styles/globals.css"; //기본 스타일
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

//타입 지정
type NextPageWithLayout = NextPage & {
  getLayout: (page:ReactNode) => ReactNode;
}

//Component -> page
//pageProps -> 모든 Props 
export default function App({ Component, pageProps }: AppProps & {
  Component: NextPageWithLayout
}) {

  const getLayout = Component.getLayout ?? ((page: ReactNode)=>page); //undefined일 경우 그냥 page를 리턴

  return (
    <GlobalLayout>
        {getLayout(<Component {...pageProps}></Component>)}
    </GlobalLayout>
  )
}
//root component
//모든 페이지들의 부모 컴포넌트를 의미한다