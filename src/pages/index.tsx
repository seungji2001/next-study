//css module을 사용하지 
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css" //import css 안된다. //객체로 변환하여 호출하는 방향으로 한다
import { ReactNode } from "react";
import books from '@/mock/books.json'//@ -> src밑에
import BookItem from "@/components/book-item";

export default function Home() { //default이다.
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book}/>
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book}/>
        ))}
      </section>
    </div>
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