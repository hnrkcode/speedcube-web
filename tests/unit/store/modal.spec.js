/**
 * @jest-environment jsdom
 */

import modal from "@/store/modules/modal";

describe("store/modules/modal.js", () => {
  it("Switch to modal named 'login'", () => {
    const state = {
      activeModal: null,
      data: null,
    };

    const payload = {
      modal: "login",
    };

    modal.mutations.switchModal(state, payload);

    expect(state.activeModal).toBe("login");
  });

  it("Test mutation that open or close the modal", () => {
    const state = {
      activeModal: null,
      data: null,
    };

    const payload = {
      modal: "login",
      data: null,
    };

    // Need to create this element to run the test because
    // the mutation contains DOM manipulation that toggles
    // the modal by adding a class to the element.
    document.body.innerHTML = "<div id='app-modal'></div>";

    modal.mutations.toggleModal(state, payload);

    expect(state.activeModal).toBe("login");
    expect(state.data).toBeNull();
  });
});
