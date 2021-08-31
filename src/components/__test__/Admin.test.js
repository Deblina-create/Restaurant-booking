import React, { useState } from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { AdminPage } from "../AdminPage";
import { act } from "react-dom/test-utils";

let documentBody: RenderResult;
describe('<Admin />', () => {
  beforeEach(() => {
    documentBody = render(<AdminPage />);
  });

  it('render Admin correctly', () => {
    expect(documentBody.getByText('Admin')).toBeInTheDocument();
    
  });

  // test('calls onClick prop when clicked', () => {
  //   const handleClick = jest.fn()
  //   render(<AdminPage/>)
  //   fireEvent.click(screen.getByTestId("add"))
  //   expect(handleClick).toHaveBeenNthCalledWith(1)
  // })

});
