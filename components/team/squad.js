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

export const TeamSquad = ({composition}) => {
  return (
    <article className='wrapped-card squad'>
      <div className='squad-title'>
        <p>Squad X</p>
      </div>
      <SquadMember type='em'/>
      {
        Array(composition.design || 0)
          .fill()
          .map(() => (
            <SquadMember type='design'/>
          ))
      }
      {
        Array(composition.product || 0)
          .fill()
          .map(() => (
            <SquadMember type='product'/>
          ))
      }
      {
        Array(composition.tech || 0)
          .fill()
          .map(() => (
            <SquadMember type='tech'/>
          ))
      }
      {
        Array(composition.data || 0)
          .fill()
          .map(() => (
            <SquadMember type='data'/>
          ))
      }
    </article>
  )
}