import React from "react";

const InputBox = React.memo(
  ({
    title, //  제목
    buttonTitle, // 버튼 제목
    inputPlaceholader,
    inputMaxLength = 30,
    id,
    inputClassName,
    inputChange,
    inputValue,
    inputBlur,
    buttonClick,
    errObject,
    isButton = true,
    isDisable = false,
    inputType = "text",
    isClose = false,
    closeClick,
  }: {
    title?: string;
    buttonTitle?: string;
    inputPlaceholader?: string;
    inputMaxLength?: number;
    id: string;
    inputClassName: string;
    inputChange?: any;
    inputBlur?: any;
    inputValue: string;
    buttonClick?: any;
    errObject?: any;
    isButton?: boolean;
    isDisable?: boolean;
    inputType?: string;
    isClose?: boolean | null;
    closeClick?: any;
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
              type={inputType}
              placeholder={inputPlaceholader}
              id={id}
              className={
                isClose === true
                  ? "register-input-error body3-regular margintop-8"
                  : isClose === false
                  ? "register-input body3-regular margintop-8"
                  : isClose === null
                  ? "register-input-success body3-regular margintop-8"
                  : ""
              }
              // style={{ background: nickNameChk ? "" : "red" }}
              onChange={inputChange}
              onBlur={inputBlur}
              value={inputValue}
              maxLength={inputMaxLength}
              disabled={isDisable}
            />
          </div>
          {/* {isClose === true ? (
            <div style={{ position: "relative" }}>
              <label
                htmlFor="passwordReconfirm"
                className={
                  isButton
                    ? "register-inputBox-close"
                    : "register-inputBoxButton-close"
                }
                onClick={() => {
                  closeClick();
                }}
              ></label>
            </div>
          ) : (
            <></>
          )} */}
          {isButton ? (
            <button
              type="button"
              className={
                title
                  ? "register-button btn-p-xl body3-bold margintop-28 marginleft-8"
                  : "register-button btn-p-xl body3-bold margintop-8 marginleft-8"
              }
              onClick={buttonClick}
            >
              {buttonTitle}
            </button>
          ) : (
            <></>
          )}
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
