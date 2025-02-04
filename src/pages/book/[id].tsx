import { GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import style from "./[id].module.css"
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

//동적 경로이기 때문에 경로를 우선 정의해야한다 -> getStaticPaths -> getStaticProps
const mockData = {
    "id": 1,
    "title": "한 입 크기로 잘라 먹는 리액트",
    "subTitle": "자바스크립트 기초부터 애플리케이션 배포까지",
    "description": "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
    "author": "이정환",
    "publisher": "프로그래밍인사이트",
    "coverImgUrl": "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg"
}

export const getStaticPaths = () =>{
    return {
        paths: [
            {params: {id:"1"}},
            {params: {id:"2"}},
            {params: {id:"3"}},
        ],
        //대체, 대비책, 보험 book/4 의 대비책
        // fallback: "blocking", //path가 없어도 자동으로 추가 생성한다 (ssr + ssg)
        //fallback: false //not found ->404로 이동하게 된다.
        fallback:true //props없는 페이지 반환 -> props계산 이후 props만 렌더링하게 된다
    }
}

export const getStaticProps = async(
    context:GetStaticPropsContext
) => {

    const id = context.params!.id; //Number type으로 형 변환
    const book = await fetchOneBook(Number(id))

    //만약 문제가 발생하였을때 문구가 아닌, not found 페이지로 이동시키고 싶을 경우
    if(!book){
        return {
            notFound:true,
        }
    }

    return {
        props:{book},
    };
};
//이 경우 메타 태그들은 빠져있다

//optional catch all segment -> 루트 경로도 대응한다 
//http://localhost:3000/book/13/13/13/13
export default function Page({book} : InferGetStaticPropsType<typeof getStaticProps>)
{
    const router = useRouter();
    if(router.isFallback) {
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
        </>
      )
    }
    if(!book) return "문제가 발생했습니다. 다시 시도해주세요";

    const {
      id,
      title,
      subTitle,
      description,
      author,
      publisher,
      coverImgUrl,
    } = book;
  
    return (
      <>
          <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl}/>
        <meta property="og:title" content={title}></meta>
        <meta
        property="og:description"
        content={description}
        />
            </Head>
            <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
      </>
    );
  }