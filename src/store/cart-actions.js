
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// action thunk

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://react-redux-app-13b0b-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok){
                throw new Error('Could not fetch Cart Data!')
            }
            const data = await response.json();
            return data;
        }

        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        }catch(error){
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Fetching cart data failed!",
                })
              ); 
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
  
      const sendRequest = async () => {
  
        const response = await fetch(
          "https://react-redux-app-13b0b-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({
                items: cart.items,
                totalQuantity: cart.totalQuantity,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Sending Cart Data failed!!");
        }
      }
  
      try{
        await sendRequest();
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data sucessfully!",
          })
        );
      }catch(error){
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
      }
  
  
    };
  };
  