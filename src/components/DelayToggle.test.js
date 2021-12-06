import React from "react";
import DelayToggle from "./DelayToggle";
import {
  render,
  fireEvent,
  wait,
  waitForElement,
  waitForDomChange,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("<DelayedToggle />", () => {
  it("reveals text when toggle is ON", async () => {
    const { getByText } = render(<DelayToggle />);
    const toggleButton = getByText("TOGGLE");
    fireEvent.click(toggleButton);
    await wait(() => getByText("야호!!"), { timeout: 1500 }); // 콜백 안의 함수가 에러를 발생시키지 않을때까지 기다리다가, timeout을 초과하면 test-case가 실패하게 된다.
  });

  it("toggles text ON/OFF", async () => {
    const { getByText } = render(<DelayToggle />);
    const toggleButton = getByText("TOGGLE");
    fireEvent.click(toggleButton);
    const text = await waitForElement(() => getByText("ON"));
    expect(text).toHaveTextContent("ON");
  });

  it("changes something when button is clicked", async () => {
    const { getByText, container } = render(<DelayToggle />);
    const toggleButton = getByText("TOGGLE");
    fireEvent.click(toggleButton);
    const mutations = await waitForDomChange({ container });
    console.log(mutations);
  });

  it("removes text when toggle is OFF", async () => {
    const { getByText, container } = render(<DelayToggle />);
    const toggleButton = getByText("TOGGLE");
    fireEvent.click(toggleButton);
    await waitForDomChange({ container }); // ON 이 됨
    getByText("야호!!");
    fireEvent.click(toggleButton);
    await waitForElementToBeRemoved(() => getByText("야호!!"));
  });
});
