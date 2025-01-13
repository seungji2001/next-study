import { BookData } from "@/types";

export default async function fetchBooks(q?:string) : Promise<BookData[]>{
    let url = `http://localhost:12345/book`

    console.log(q)
    if(q){
        url += `/search?q=${q}`;
    }

    try{
        const response = await fetch(url);
        /**서버로부터 HTTP 응답을 받아오는 작업
            이 시점에서는 응답 데이터가 아직 JSON으로 파싱되지 않은 상태
            Response 객체만 받아온 상태
            */
        if(!response.ok){
            throw new Error();
        }

        /**받아온 응답 본문을 JSON으로 파싱하는 작업
이것도 비동기 작업이라 await가 필요함 */
        return await response.json();
    }catch(err){
        console.error(err);
        return [];
    }
}