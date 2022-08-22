import { useState } from 'react';
import { useDrop } from 'react-dnd';

export const SquadMember = ({type}) => {
  const [member, setMember] = useState({});

  const addToSquad = (member) => {
    // update member in DB
    setMember(member);
  };

  const [, drop] = useDrop(
    () => ({
      accept: 'teammember',
      canDrop: (item) => item.type === type,
      drop: (item, monitor) => {
        addToSquad(item);
        return undefined;
      },
    }),
    [addToSquad],
  )

  return (
    <div 
      ref={drop}
      className={`member ${type} ${member.id?'filled':''}`}
    >
      {member.id}
    </div>
  )
}

export const TeamSquad = ({style, className, composition, children}) => {
  return (
    <article 
      className={className}
      style={{
        ...style,
        display: 'flex',
        flexFlow: 'row wrap',
        gap: '16px',
        justifyContent: 'center'
      }}>
      <SquadMember type='title'/>
      <SquadMember type='em'/>
      {
        Array(composition.design)
          .fill()
          .map(() => (
            <SquadMember type='design'/>
          ))
      }
      {
        Array(composition.product)
          .fill()
          .map(() => (
            <SquadMember type='product'/>
          ))
      }
      {
        Array(composition.tech)
          .fill()
          .map(() => (
            <SquadMember type='tech'/>
          ))
      }
    </article>
  )
}