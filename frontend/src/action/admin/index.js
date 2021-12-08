import BaseService from "services";

const listUser = (token) => async (dispatch) => {
  const result = await BaseService.get(
    `${process.env.REACT_APP_BACKEND_URL}/list-user`,
    {},
    token
  );
  dispatch({
    type: "LIST_USER",
    payload: result.data,
  });
};

const createUser =
  (email, password, fullname, address, phoneNumber, role, token) =>
  async (dispatch) => {
    try {
      const result = await BaseService.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-user`,
        { email, password, fullname, address, phoneNumber, role },
        token
      );
      dispatch({
        type: "CREATE_USER",
        payload: result.data,
      });

      return Promise.resolve(result.data);
    } catch (err) {
      dispatch({
        type: "CREATE_USER_FAILURE",
        payload: err.response.data,
      });
      return Promise.reject(err.response.data);
    }
  };

const deleteUser = (id, token) => async (dispatch) => {
  await BaseService.delete(
    `${process.env.REACT_APP_BACKEND_URL}/delete-user`,
    id,
    token
  );
  dispatch({
    type: "DELETE_USER",
    payload: { id },
  });
};

export { listUser, createUser, deleteUser };
