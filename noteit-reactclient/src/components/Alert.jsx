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
      <div className="alert alert-warning alert-dismissible fade show col-10 mx-auto my-0" role="alert">
        <svg width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="flex-shrink-0 me-2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="x-circle"> <g> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.5" x2="9.5" y1="9.5" y2="14.5"></line> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.5" x2="9.5" y1="14.5" y2="9.5"></line> </g> </g> </g> </g></svg>
        {props.children}
        {/* [demo] adding a close button to a dismissable alert */}
        {/* onClick={props.onClose} */}
        {/* <button  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
      </div>
    </>
  )
}

export default Alert