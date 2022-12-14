import axios from "axios"

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type : 'PRODUCT_LIST_REQUEST' })
        const { data } = await axios.get(`/api/products?keyword=${keyword}`)
        dispatch({
            type : 'PRODUCT_LIST_SUCCESS',
            payload : data,
        })
    } catch(error) {
        dispatch({
            type : 'PRODUCT_LIST_FAIL',
            payload : error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

        })
    }
}


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type : 'PRODUCT_DETAILS_REQUEST' })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type : 'PRODUCT_DETAILS_SUCCESS',
            payload : data,
        })
    } catch(error) {
        dispatch({
            type : 'PRODUCT_DETAILS_FAIL',
            payload : error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

        })
    }
}




export const productDeleteAct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type : 'PRODUCT_DELETE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type : 'PRODUCT_DELETE_SUCCESS',
        })

    } catch(error) {
        dispatch({
            type : 'PRODUCT_DELETE_FAIL',
            payload : error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}




export const productUpdateAct = (id, product) => async (dispatch, getState) => {
    try {
        dispatch({ type : 'PRODUCT_UPDATE_REQUEST' })
        
        const { userLogin: { userInfo } } = getState()
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/products/${id}`, product, config)

        dispatch({
            type : 'PRODUCT_UPDATE_SUCCESS',
            payload : data,
        })

    } catch(error) {
        dispatch({
            type : 'PRODUCT_UPDATE_FAIL',
            payload : error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

        })
    }
}



export const productCreateAct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type : 'PRODUCT_CREATE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(`/api/products/createproduct`, product, config)

        dispatch({
            type : 'PRODUCT_CREATE_SUCCESS',
            payload : data,
        })
    } catch(error) {
        dispatch({
            type : 'PRODUCT_CREATE_FAIL',
            payload : error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

        })
    }
}



export const reviewCreateAct = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type : 'REVIEW_CREATE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.post(`/api/products/${id}/review`, review, config)

        dispatch({
            type : 'REVIEW_CREATE_SUCCESS',
        })
    } catch(error) {
        dispatch({
            type : 'REVIEW_CREATE_FAIL',
            payload : error.response && error.response.data.message
            ? error.response.data.message
            : error.message,

        })
    }
}

