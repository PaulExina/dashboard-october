import { useEffect, useRef } from "react";
import Cross from "../public/assets/icons/cross.svg";

export const Modal = ({isOpened, onClose, children}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  return (
    <dialog 
      ref={ref} 
      onCancel={onClose} 
      onClick={onClose}
      >
      <div className='modal'>
        <div className="close-button">
          <Cross />
        </div>

        {children}
      </div>
    </dialog>
  )
}