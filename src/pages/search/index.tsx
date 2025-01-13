import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router"; //next navigation -> 앱 라우터 전용
import { ReactNode, useEffect, useState } from "react";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { get } from "http";
import { BookData } from "@/types";

// export const getStaticProps = async (context: GetStaticPropsContext) =>{
    
//     // const q = context.query.q; //빌드 타임에 q를 알 수 없다 -> ssg로 수행 할 수 없다
//     const books = await fetchBooks(q as string);

//     return {
//         props: {
//             books
//         },
//     };
// };


//router 사용 가능
//쿼리스트링을 사용할 경우에는 리엑트에서 하는 것과 같이 사용한다
export default function Page(){

    const [books, setBooks] = useState<BookData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async() => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(() => {
        if(q){
            fetchSearchResult();
        }
    },[q]);

    return(
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book}></BookItem>
            ))}
        </div>
    )
}
//http://localhost:3000/search 로 접근 가능

Page.getLayout = (page:ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}