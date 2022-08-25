import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ArrowLeft from '../public/assets/icons/arrow-left.svg';
import { TeamOverview } from './team/overview';
import { TeamSquads } from './team/squads';

export default function Team() {
  const [page, setPage] = useState('/');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
  }, [])

  const moveTo = (href) => {
    setPage(href);
  };

  const tabs = [
    { title: 'Overview', route: '/' },
    { title: 'Squads', route: '/squads' }
  ];

  const mainContent = (page) =>{
    if (page === '/') {
      return <TeamOverview users={users}/>;
    } else {
      return <TeamSquads />;
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Team composition</title>
      </Head>

      <header>
        <Link
          href='/'
          >
          <div className='back-button'>
            <ArrowLeft />
          </div>
        </Link>
        <h1>
          Team
        </h1>
        <nav className='upper-tabs'>
          {
            tabs.map((tab) => (
              <a 
                className={page===tab.route ? 'current' : undefined}
                onClick={() => moveTo(tab.route)}
                >
                  {tab.title}
              </a>
            ))
          }
        </nav>
      </header>  
      
      <main>
        {mainContent(page)}
      </main>
      
    </div>
  );
}
