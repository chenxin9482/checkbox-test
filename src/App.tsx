import { useState } from "react";
import "./App.css";
import Checkbox from "./components/checkbox";
import type {
  CheckboxValueType,
  CheckboxChangeEvent,
} from "./components/checkbox";

function App() {
  const list = ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg", "hhh", "iii"];
  const defaultCheckedList = ["aaa", "ccc", "fff", "ggg", "iii"];
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    const value = e.target.children as CheckboxValueType;
    const index = checkedList.findIndex((v) => v === value);
    let target = [];
    if (index > -1) {
      checkedList.splice(index, 1);
      setCheckedList([...checkedList]);
    } else {
      target = [...checkedList, value];
      setCheckedList(target);
    }
    setCheckAll(target.length === list.length ? true : false);
  };
  const onChangeAll = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    setCheckAll(checked);
    setCheckedList(checked ? list : []);
  };
  return (
    <>
      <Checkbox
        className={!checkAll && checkedList.length ? "checkbox-part" : ""}
        onChange={onChangeAll}
        checked={checkAll}
      >
        Check All
      </Checkbox>
      {list.map((item) => (
        <Checkbox
          key={item}
          onChange={onChange}
          checked={checkedList.includes(item)}
        >
          {item}
        </Checkbox>
      ))}
    </>
  );
}

export default App;
