import Checkbox from "./Checkbox";

export type { CheckboxChangeEvent, CheckboxProps } from "./Checkbox";

export interface CheckboxRef {
  focus: () => void;
  blur: () => void;
  input: HTMLInputElement | null;
}
export type CheckboxValueType = string | number | boolean;

export default Checkbox;
