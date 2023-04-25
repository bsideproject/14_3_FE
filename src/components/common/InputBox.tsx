import React from "react";

const InputBox = React.memo(
  ({
    title,
    buttonTitle,
    inputPlaceholader,
    inputMaxLength,
    id,
    inputClassName,
    inputChange,
    inputValue,
    buttonClick,
    inputCheck,
    errMsg,
    errClassName = "register-input-error-msg",
    errObject,
  }: {
    title?: string;
    buttonTitle: string;
    inputPlaceholader: string;
    inputMaxLength: number;
    id: string;
    inputClassName: string;
    inputChange: any;
    inputValue: string;
    buttonClick: any;
    inputCheck: boolean;
    errMsg?: string;
    errClassName?: string;
    errObject?: any;
  }) => {
    return (
      <>
        <div
          className={inputClassName}
          style={{ height: title ? "100%" : "48px" }}
        >
          <div className="register-box">
            {title ? (
              <div className="body3-bold" style={{ lineHeight: "20px" }}>
                {title}
              </div>
            ) : (
              <></>
            )}
            <input
              type="text"
              placeholder={inputPlaceholader}
              id={id}
              className={"register-input body3-regular margintop-8"}
              // style={{ background: nickNameChk ? "" : "red" }}
              onChange={inputChange}
              // onBlur={handleNickNameBlur}
              value={inputValue}
              maxLength={inputMaxLength}
            />
          </div>
          <button
            type="button"
            className={
              title
                ? "register-button body3-bold margintop-28"
                : "register-button body3-bold margintop-8"
            }
            onClick={buttonClick}
          >
            {buttonTitle}
          </button>
        </div>
        {errObject}
        {/* {inputCheck === false ? (
          <div className={errClassName}>{errMsg}</div>
        ) : (
          <></>
        )} */}
      </>
    );
  }
);
export default InputBox;
