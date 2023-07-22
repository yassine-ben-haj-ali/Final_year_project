import React from "react";

const Alert = ({ Text, Type, Icon }) => {
  return (
    <div class="alert border-0 bg-light-danger alert-dismissible fade show py-1">
      <div class="d-flex align-items-center">
        <div className={`fs-3 ${Type}`}>
          <i class={`bi ${Icon}`}></i>
        </div>
        <div class="ms-3">
          <div class={Type}>{Text}</div>
        </div>
      </div>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
