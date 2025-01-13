import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router"; //next navigation -> 앱 라우터 전용
import { ReactNode } from "react";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { get } from "http";

export const getServerSideProps = async (context: GetServerSidePropsContext) =>{
    
    const q = context.query.q;
    const books = await fetchBooks(q as string);

    return {
        props: {
            books
        },
    };
};

//router 사용 가능

export default function Page({books} : InferGetServerSidePropsType<typeof getServerSideProps>){
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