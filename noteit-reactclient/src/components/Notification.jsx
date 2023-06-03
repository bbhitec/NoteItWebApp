
import React from "react";
import { ReactNode } from "react";

// interface NotificationProps {
//   // [demo] passing props inline can be limiting '<Component prop={bla bla...} />'
//   // thus, instead of 'text: string;' we can pass all the children as...
//   children: ReactNode;
//   onClick: () => void;
//   onClose: () => void;
// }

const Notification = (props) => {
  return (
    <>
      <div className="alert alert-success alert-dismissible fade show col-10 mx-auto my-0" role="alert">
        <svg width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="flex-shrink-0 me-2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="info-circle"> <g> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="12" y2="16"></line> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="8"></line> </g> </g> </g> </g></svg>
        {props.children}
        {/* [demo] adding a close button to a dismissable alert */}
        <button onClick={props.onClose} type="button" className="btn-close close" data-dismiss="alert" aria-label="Close" />
      </div>
    </>
  )
}

export default Notification