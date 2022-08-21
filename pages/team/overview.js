export const TeamOverview = () => {
  return <div className='overview' style={styles.overview}>
    <article className='wrapped-card' style={styles.article}>
      insert cheese graph here
    </article>
    <aside className='wrapped-card' style={styles.aside}>
      insert caption here
    </aside>
  </div>
}

const styles = {
  overview: {
    display: 'grid',
    height: '100%',
    gridGap: '16px'
  }, 
  article: {
    gridColumn: '1/ span 3',
    gridRow: '1/ span 4'
  },
  aside: {
    gridColumn: '4',
    gridRow: '1/ span 3'
  }
}
