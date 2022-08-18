import Head from 'next/head';
import metrics from '../public/metrics.json';

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
      <div 
        className='wrapped-card' 
        id={metric.id}
        style={metricStyle}
        >
        {metric.title}
      </div> 
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

      <main>
        <DashBoard />
      </main>  
    </div>
  )
}
