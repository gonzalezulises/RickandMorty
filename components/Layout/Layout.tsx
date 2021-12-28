import Head from 'next/head'
import Aside from './Aside';

const name = 'Eber Reta'
export const siteTitle = 'Next.js Sample Website'

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Rick and Morty Wiki</title>
        <meta name="description" content="Rick and Morty Wiki" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet"/>
      </Head>
      <div className="wrapper d-flex align-items-stretch">
          <Aside />
          <main id="content" className="p-4 p-md-5 pt-5">
            {children}
          </main>
      </div>

    </>
  )
}