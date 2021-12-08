import axios from "axios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const success = () => {
  return {
    type: "LOGIN_SUCCESSFULL",
  };
};

const loginData = () => (dispatch) => {
  console.log(`${process.env.REACT_APP_BACKEND_URL}/login`);
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      email: "admin@gmail.com",
      password: "1q2w3e",
    })
    .then(() => dispatch(success()));
};

describe('test login', () => {
    test('it should execute login data', () => {
        const store = mockStore({});

        return store.dispatch(loginData()).then(()  => {
            const actions = store.getActions()
            expect(actions[0]).toEqual(success());
        })
    })
})
