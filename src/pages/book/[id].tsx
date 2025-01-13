import {useRouter} from "next/router"

//http://localhost:3000/book/13
export default function Page(){
    const router = useRouter();
    const {id} = router.query;
    return <h1>Book</h1>;
}