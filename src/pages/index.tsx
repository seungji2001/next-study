import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css" //import css 안된다. //객체로 변환하여 호출하는 방향으로 한다
import { ReactNode, useEffect } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

//SSR로 만들기
//약속된 함수이다.
export const getStaticProps = async () => {
  //컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터 불러오는 함수
  //객체를 반환해야한다 props:{} 형태로 
  //component에서 사용이 가능하다 
  //data로 들어간다
  //브라우저 안된다. 

  //직렬 방식
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ])

  return {
    props:{
      allBooks,
      recoBooks
    },
  }
}

export default function Home({
  allBooks,
  recoBooks
}:InferGetStaticPropsType<typeof getStaticProps>) { //default이다.

  //윈도우 핸들링 하려면 useEffect를 사용한다
  useEffect(() => {
    console.log(allBooks);
  },[])

  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumnail.png"/>
        <meta property="og:title" content="한입북스"></meta>
        <meta
        property="og:description"
        content="한입북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book}/>
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book}/>
        ))}
      </section>
    </div>
    </>
  );
}

//home component에 getLayout이라는 메서드를 추가, 그리고 ReactNode타입의 page를 파라미터로 받음
//Home.getLayout을 명시하고 리턴 값을 레이아웃에 설정 할 경우, app.tsx에서 이를 꺼내서 사용이 가능하다
//const getLayout = Component.getLayout
//<GlobalLayout>
//  {getLayout(<Component { ...pageProps}/>)}
Home.getLayout = (page: ReactNode) =>{
  return <SearchableLayout>{page}</SearchableLayout>
}