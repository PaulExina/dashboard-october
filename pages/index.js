import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Modal } from '../components/modal';
import metrics from '../public/metrics.json';
import { useRouter } from 'next/router';

const DashCard = ({metric}) => {
  const [isOpened, setIsOpened] = useState(false);
  const metricStyle = metric.position 
    ? {
      gridColumn: metric.position.column.span 
        ? `${metric.position.column.index} /span ${metric.position.column.span}`
        : metric.position.column.index,
      gridRow: metric.position.row.span 
        ? `${metric.position.row.index} /span ${metric.position.row.span}`
        : metric.position.row.index
    }
    : undefined;
  
  const toggleModal = () => {
    setIsOpened(!isOpened);
  };

  return (
    <Link
      href={`/${metric.id}`}
    >
      <div 
        className='wrapped-card' 
        key={`container.${metric.id}`}
        id={metric.id}
        style={metricStyle}
        >
        {metric.title}
        <Modal key={metric.id} isOpened={isOpened} onClose={toggleModal}> 

        </Modal>
      </div> 
    </Link>
  )
}

export const DashBoard = () => {
  let zones = [];

  zones = metrics.map((metric) => {
    const metricStyle = metric.position 
      ? {
        gridColumn: metric.position.column.span 
          ? `${metric.position.column.index} /span ${metric.position.column.span}`
          : metric.position.column.index,
        gridRow: metric.position.row.span 
          ? `${metric.position.row.index} /span ${metric.position.row.span}`
          : metric.position.row.index
      }
      : undefined;
    
    return (
      <DashCard metric={metric} />
    )
  });

  return <>{zones}</>;
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Staging</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='dashboard'>
        <DashBoard />
      </main>  
    </div>
  )
}
