import classNames from "classnames";
import * as React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import "./checkbox.scss";

/**
 * @type 复选框点击事件
 */
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent<HTMLInputElement>["nativeEvent"];
}

/**
 * @type 复选框点击事件返回
 */
export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

/**
 * @type 复选框句柄
 */
export interface CheckboxRef {
  focus: () => void;
  blur: () => void;
  input: HTMLInputElement | null;
}

/**
 * @type 支持属性
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  prefixCls?: string;
  onChange?: (e: CheckboxChangeEvent) => void;
}

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const {
    prefixCls = "checkbox",
    className,
    style,
    value,
    checked = false,
    disabled,
    type = "checkbox",
    children,
    onChange,
    ...inputProps
  } = props;
  
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    input: inputRef.current,
  }));

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-checked`]: checked,
    [`${prefixCls}-disabled`]: disabled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    onChange?.({
      target: {
        ...props,
        type,
        checked: e.target.checked,
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent,
    });
  };

  return (
    <label>
      <span className={classString} style={style}>
        <input
          {...inputProps}
          className={`${prefixCls}-input`}
          ref={inputRef}
          onChange={handleChange}
          disabled={disabled}
          checked={!!checked}
          value={value}
          type={type}
        />
        <span className={`${prefixCls}-inner`}></span>
      </span>
      {children !== undefined && <span>{children}</span>}
    </label>
  );
});

export default Checkbox;
