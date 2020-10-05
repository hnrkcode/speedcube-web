const namespaced = true;

const state = {
  activeModal: null,
  data: null,
};

const getters = {};

const mutations = {
  // Switch which modal is currently active.
  switchModal: (state, payload) => {
    state.activeModal = payload.modal;
  },
  // Open or close the modal.
  toggleModal: (state, payload) => {
    const modal = document.getElementById("app-modal");
    modal.classList.toggle("is-active");

    /* The value assigned to 'activeModal' decides which content the modal shows,
    which the conditional rendering in 'AppModal.vue' handles.
    When the modal is closed the value is set to 'null'. */
    state.activeModal = payload.modal;

    // Used to send an index number to be able to display the right data in the 'edit-time' modal.
    state.data = payload.data;
  },
};

const actions = {
  switchModal: (context, payload) => {
    context.commit("switchModal", payload);
  },
  toggleModal: (context, payload) => {
    context.commit("toggleModal", payload);
  },
  closeModal: (context) => {
    context.commit("toggleModal", { modal: null, data: null });
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
