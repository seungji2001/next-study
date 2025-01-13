import {useRouter} from "next/router"

//optional catch all segment -> 루트 경로도 대응한다 
//http://localhost:3000/book/13/13/13/13
export default function Page(){
    const router = useRouter();
    const {id} = router.query; //배열 형태로 제공한다
    return <h1>catchallsegment{id}</h1>;
}