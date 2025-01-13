import { useRouter } from "next/router"; //next navigation -> 앱 라우터 전용
//router 사용 가능

export default function Page(){
    const router = useRouter();

    console.log(router);
    const {q} = router.query; //query string 가져오기 

    return <h1>search { q }</h1>;
}
//http://localhost:3000/search 로 접근 가능