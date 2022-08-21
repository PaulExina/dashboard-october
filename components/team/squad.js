export const TeamSquad = ({style, className, composition, children}) => {
  return (
    <article 
      className={className}
      style={{
        ...style,
        display: 'flex',
        flexFlow: 'row wrap',
        gap: '16px',
        justifyContent: 'center',
      }}>
      <div style={{...styles.member, ...styles.em}}></div>
      {
        Array(composition.design)
          .fill()
          .map(() => (
            <div style={{...styles.member, ...styles.design}}>
            </div>
          ))
      }
      {
        Array(composition.product)
          .fill()
          .map(() => (
            <div style={{...styles.member, ...styles.product}}>
            </div>
          ))
      }
      {
        Array(composition.tech)
          .fill()
          .map(() => (
            <div style={{...styles.member, ...styles.tech}}>
            </div>
          ))
      }
    </article>
  )
}

const styles = {
  member: {
    border: '2px dashed grey',
    borderRadius: '50%',
    maxHeight: '64px',
    width: '64px',
    opacity: 0.5
  },
  em: {
    flex: '1 0 100%',
    maxWidth: 'none',
    borderRadius: '6px',
  },
  design: {
    borderColor: '#4fbdb2',
    background: '#cfeeeb'
  },
  product: {
    background: '#fae5d6',
    borderColor: '#eb9c64',
    
  },
  tech: {
    background: '#e2cdf2',
    borderColor: '#8834cb'
  }
}