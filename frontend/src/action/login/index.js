import BaseService from "services";

const loginAction = (email, password) => async (dispatch) => {
    try {
        const result = await BaseService.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {email, password});
        dispatch({
            type: 'LOGIN_SUCCESSFULL',
            payload: result.data
        })
        return Promise.resolve(result.data);
    } catch (err) {
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: err.response.data
        })
        return Promise.reject(err.response.data);
    }
}

export { loginAction };