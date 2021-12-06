import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("<TodoForm />", () => {
  const setup = (props = {}) => {
    const utils = render(<TodoForm {...props} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText("할 일을 입력하세요"); // input이 있는지 확인
    const button = getByText("등록"); // button이 있는지 확인
    return {
      ...utils,
      input,
      button,
    };
  };

  it("has input and a button", () => {
    const { input, button } = setup();
    expect(input).toBeTruthy(); // 해당 값이 Truthy 한 값인지 확인
    expect(button).toBeTruthy();
    // const { getByText, getByPlaceholderText } = render(<TodoForm />);
    // getByPlaceholderText("할 일을 입력하세요"); // input이 있는지 확인
    // getByText("등록"); // button이 있는지 확인
  });

  it("changes input", () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: "TDD with vlpt",
      },
    });

    expect(input).toHaveAttribute("value", "TDD with vlpt");
  });

  it("calls onInsert and clears input", () => {
    const onInsert = jest.fn();
    const { input, button } = setup({ onInsert });

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
