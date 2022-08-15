import Head from 'next/head'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Staging</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="search-bar"></div>
        <div className="navigation-bar">
          <div className="card">
            <Link  href="/entities/team">
              <h3>Team</h3>
            </Link>
          </div>

          <div className="card">
            <Link  href="/entities/product">
              <h3>Product</h3>
            </Link>
          </div>
          <div className="card">
            <Link  href="/entities/tech">
              <h3>Tech</h3>
            </Link>
          </div>
        </div>
        <div className="dashboard-container">
          <div className="wrapped-card large"></div>
          <div className="wrapped-card medium"></div>
          <div className="wrapped-card large"></div>
          <div className="wrapped-card medium"></div>
          <div className="wrapped-card large"></div>
          <div className="wrapped-card medium"></div>
          <div className="wrapped-card large"></div>
          <div className="wrapped-card medium"></div>
        </div>
      </main>
    </div>
  )
}
