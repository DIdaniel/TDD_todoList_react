import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("<TodoForm />", () => {
  it("has input and a button", () => {
    const { getByText, getByPlaceholderText } = render(<TodoForm />);
    getByPlaceholderText("할 일을 입력하세요"); // input이 있는지 확인
    getByText("등록"); // button이 있는지 확인
  });

  it("changes input", () => {
    const { getByPlaceholderText } = render(<TodoForm />);
    const input = getByPlaceholderText("할 일을 입력하세요");
    // eslint-disable-next-line no-undef
    fireEvent.change(input, {
      target: {
        value: "TDD with vlpt",
      },
    });
    expect(input).toHaveAttribute("value", "TDD with vlpt");
  });

  it("calls onInsert and clears input", () => {
    const onInsert = jest.fn();
    const { getByText, getByPlaceholderText } = render(<TodoForm onInsert={onInsert} />);

    const input = getByPlaceholderText("할 일을 입력하세요");
    const button = getByText("등록");

    // 수정하기
    fireEvent.change(input, {
      target: {
        value: "TDD with vlpt",
      },
    });

    // 버튼 클릭
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith("TDD with vlpt"); // onInsert가 "TDD with vlpt" 파라미터가 호출됐어야함
    expect(input).toHaveAttribute("value", ""); // input이 비워져야함
  });
});
