# Nest.js intro

## Library vs Framework



- React : Library
- NextJS : Framework
- React에서는 내 맘대로 라우팅을 할 장소를 정할 수 있다. 라우트폴더를 만들던 컴포넌트폴더에서 하던 내 마음대로! 하지난 Next에서는 `pages`폴더 안에서 라우팅을 모두 처리합니다. 이는 Framework가 정한 규칙이고 우리는 그걸 따라야 합니다. 

## Pages



- `pages` 폴더의 파일명이 `url`이 됩니다.
- `index.js` 는 홈페이지 즉 `"/"` 페이지입니다.
- `component` 이름은 중요하지 않지만 `component`를 반드시 `export default`를 해줘야 한다.

## NextJS



- Next.js에서 react는 기본으로 import 되어 있습니다.

## CRA vs SSR



- client-sie-rendering : 브라우저가 자바스크립트 코드, react 코드를 가지고 앱을 작동시킨다. 만약 인터넷이 절망적으로 느리다면 유저는 빈화면을 오랫동안 보게 될 것입니다.
- 이 경우 우리가 볼 `html` 에는 텅빈 `<div>` 뒤의 긴 `jript`코드 입니다.
- server-side-rendering 의 경우 static한 `html`을 서버단에서 pre-rendering하여 넘겨줍니다.
- 따라서 SEO 최적화에 유리합니다.

## Routing



- `next/link` 에서 제공하는 `<Link>` 컴포넌트를 사용하여 클라이언트사이드라우팅을 할 수 있습니다.
- `<a>` 만을 사용하면 페이지가 새로고침 되어서 속도가 느립니다.
- `<Link>` 안에 `<a>` 를 넣어서 사용합니다.

```html
<Link href={`/items/${id}`}>
    <a className="flex px-4 pt-5 cursor-pointer justify-between">
    </a>
</Link>
```

## Css module

- css module을 사용하여 컴포넌트마다 고유한 class명을 가지고 css를 작성할 수 있습니다.
- 두 개 이상의 클래스를 지정하고 싶을 때는 백틱(`)을 사용합니다.

```jsx
<Link href='/'>
         <a
           className='home'
           style={{ color: router.pathname === '/' ? 'purple' : 'orange' }}>
           className={`${router.pathname === '/' ? styles.active : ''} ${
             styles.link
           }`}>
           Home
         </a>
</Link>
```

## styles jsx


- styles JSX를 사용해도 class 명 중복을 막을 수 있습니다. 선언한 style의 scope는 선언한 컴포넌트에서 tree 구조상 형제 자식까지 입니다.

```jsx
<style jsx>{`
         nav {
           background-color: honeydew;
         }

         a {'
           text-decoration: none;
         }

         .active {
           color: indigo;
           font-weight: 600;
         }
`}</style>
```

## _app.js



- Next에서 `_app.js`는 항상 가장 먼저 랜더되는 component 입니다. 우리가 작성한 component들은 `_app.js`가 `props`로 받아서 랜더링되는 것이고 따라서 전역설정을 할 경우 `_app.js` 안에서 해주도록 합니다.
- `_app.js` 에서는 전역 css 설정을 해줄 수 있습니다.

```jsx
import '../styles/globals.css'; // _app.js에서 밖에 import 할 수 없습니다.

export default function MyApp({ Component, pageProps }) {
   return (
     <>
       <NavBar />
       <Component {...pageProps} />
       <span>수면 아래에서 일어나고 있움...</span>
       <style jsx global>{`
         h1 {
           color: forestgreen;
         }
       `}</style>
     </>
   );
 }
```

- 보통 `Navbar`, `Footer`등을 포함하는  `Layout` component를 만들어서  `_app.js` 안에서 함께 만들어줍니다.

```jsx
// Layout.js
import NavBar from './NavBar';

export default function Layout({ Children }) {
  return (
    <>
      <NavBar />
      <div>{Children}</div>
    </>
  );
}
```

```jsx
// _app.js
import Layout from '../component/LayOut';
import '../styles/globals.css'; // _app.js에서 밖에 import 할 수 없습니다.

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
    <Layout>
      <Component {...pageProps} />
      <span>수면 아래에서 일어나고 있움...</span>
      <style jsx global>{`
        h1 {
          color: forestgreen;
        }
      `}</style>
    </>
    </Layout>
  );
}
```

## Head component


- Next에서 제공하는`Head` component를 사용하여 page마다 title을 지정해줍니다. `Seo` component를 만들어서 좀 더 사용성이 좋게 만듭니다.

```jsx
// Seo.js
import Head from 'next/head';

export default function Seo({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
```

## server-side rendering


- client-side rendering을 하는 경우 client에서 data를 fetch가 완료 될 때까지 로딩바를 노출 시켜야 합니다. 이는 페이지가 구성된 후 client에서 api를 호출하기 때문입니다.
- server-side rendering을 하는 경우 server에서 이미 data fetch를 끝내고 이 data를 받아 페이지를 만들기 때문에 api가 느리지만 않다면 페이지를 들어가자 마자 완성된 페이지를 보여줍니다. 이는 우리 html의 소스코드에 모든 data가 들어가는 것으로 검색엔진이 우리 페이지를 찾는데 도움이 될 것입니다.
- page에서 getServerSideProps 함수를 export하여 serverside rendering을 할 수 있습니다. 이 함수 안에서의 동작은 모두 server에서 실행되고 객체를 return하면 그 key값을 pageProps로 받아서 사용합니다. client에서는 pre-rendering 된 데이터를 받아서 화면의 html을 만듭니다.

```jsx
// pages/index.js
export async function getServerSideProps() {
  const { results } = await (
    await fetch('http://localhost:3000//api/movies')
  ).json();
  return {
    props: {
      results,
    },
  };
}
```

## redirects, rewrites


- `next.config.js` 에서 `redirect` 비동기 함수에 객체배열을 넘겨줌으로써 redirects option을 지정할 수 있습니다.

```jsx
// next.config.js

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/old-blog/:path*',
        destination: '/new-blog/:path*',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig
```

- `rewirtes`를 사용하면 들어오는 request 경로를 다른 destination 결로로 매핑할 수 있습니다. 사용자는 실제 경로를 알 수 없습니다.

```jsx
// next.config.js

const API_KEY = '51a50e1e798cc339aa2a5af32624c0f9';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
```

- `.env` 에서 환경변수를 등록하고 `process.env.API_KEY` 와 같이 사용할 수 있습니다.
- `.gitignore` 에 `.env`를 등록합니다.

## Dynamic Routes

- `pages`에서 `[변수명].js`을 만들어 dyanamic route를 생성할 수 있습니다. 해당 page에서는 변수명이 router query에 담겨 있습니다.
- `useRouter` hook의 `router.push`를 이용해 routing을 할 수 있습니다.
- `router.push()`를 할 때 query를 함께 담아서 routing 할 수 있고 as option을 가지고 url을 masking 할 수 있습니다.
- *catch-all url*  : pages 에서 `[...params]`와 같이 써주면 movies/12/123/1234 과 같이 url 뒤의 모든 params를 배열의 형태로 query에 담아 보낼 수 있습니다.

```jsx
const router = useRouter();
const onClick = (id) => {
	router.push(`/movies/${id}`);
const onClick = (id, title) => {
  router.push(
    {
      pathname: `/movies/${id}`,
      query: {
        id,
        title,
      },
    },
     `/movies/${id}`
  );
};
```

<aside>
💡 단 `useRouter`를 사용하면 client에서 routing하기 때문에 params를 넘겨도 html 상에는 나타나지 않아 SEO에 적절하지 않습니다. →  *getServerSideProps를 사용하여 이를 개선할 수 있습니다.*

</aside>

## **getServerSideProps context**

- getServerSideProps 함수 안에서 `context`를 확인하여 현재 url에서 server에 담긴 정보를 확인할 수 있습니다.

```jsx
// pages/movies/[...params].js
export function getServerSideProps(ctx) {
  console.log(ctx);
  return {
    props: {},
  };
}
```

- 이어서 서버에서 params 안의 prams를 pre-rendering 해서 client로 보내줍니다.
- prams 안의 prams 객체를 보내줍시다.

```jsx
export function getServerSideProps({ params: { params } }) {
  return {
-    props: { params },
  };
}
```
