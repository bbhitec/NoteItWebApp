// [wiki] a container with children props passed down by a partent component

import React from "react";
import { ReactNode } from "react";

// interface AlertProps {
//   // [demo] passing props inline can be limiting '<Component prop={bla bla...} />'
//   // thus, instead of 'text: string;' we can pass all the children as...
//   children: ReactNode;
//   onClick: () => void;
//   onClose: () => void;
// }

const Alert = (props) => {
  return (
    <>
      <div className="alert alert-primary alert-dismissible fade show" role="alert" onClick={props.onClick}>
        {props.children}
        {/* [demo] adding a close button to a dismissable alert */}
        <button onClick={props.onClose} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </>
  )
}

export default Alert