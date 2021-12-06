import React from "react";
import TodoApp from "./TodoApp";
import { render, fireEvent } from "@testing-library/react";

describe("<TodoApp />", () => {
  it("renders TodoForm and TodoList", () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    getByText("등록"); // TodoForm 존재 유무 확인
    getByTestId("TodoList"); // TOdoList 존재유무 확인
  });

  it("renders two defaults todos", () => {
    const { getByText } = render(<TodoApp />);
    getByText("TDD 배우기");
    getByText("react-testing-library 사용하기");
  });

  it("creates new todo", () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    fireEvent.change(getByPlaceholderText("할 일을 입력하세요"), {
      target: {
        value: "새 항목 추가하기",
      },
    });
    fireEvent.click(getByText("등록"));
    // 해당항목이 보여져야한다
    getByText("새 항목 추가하기");
  });

  it("toggles todo", () => {
    const { getByText } = render(<TodoApp />);
    // TDD 배우기 항목에 클릭이벤트를 발생시키고 text-decoration 속성이 설정되는지 확인
    const todoText = getByText("TDD 배우기");
    expect(todoText).toHaveStyle("text-decoration: line-through");
    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle("text-decoration: line-through");
    fireEvent.click(todoTexq);
    expect(todoText).toHaveStyle("text-decoration: line-through");
  });

  it("removes todo", () => {
    const { getByText } = render(<TodoApp />);
    const todoText = getByText("TDD 배우기");
    const removeButton = todoText.nextSibliing;
    fireEvent.click(removeButton);
    expect(todoText).not.toBeInTheDocument(); // 페이지에서 사라졌음을 의미
  });
});
