export const initialState = {
    user: null,
};

export const actionTypes = {
    Set_USER: "Set_USER",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.Set_USER:
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
};

export default reducer;