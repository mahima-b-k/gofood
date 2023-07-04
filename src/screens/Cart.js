import React from 'react'
import { useCart,useDispatchCart } from '../components/ContextReducer';
import Delete from '@material-ui/icons/Delete';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-danger text-center fs-3'>The Cart is Empty:-I</div>
            </div>
        )
    }

    const handleCheckOut= async()=>{
        let userEmail = localStorage.getItem("userEmail");
        let response= await fetch("http://localhost:5000/api/orderData",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date: new Date().toDateString()
              })
        });
        console.log("Order Response:",response);
        if(response.status===200){
            dispatch({type: "DROP"})

        }
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-info text-center fs-3'>
                        <tr>
                            <th scope='col' >SL.NO</th>
                            <th scope='col' >NAME</th>
                            <th scope='col' >QUANTITY</th>
                            <th scope='col' >OPTION</th>
                            <th scope='col' >AMOUNT</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody className='text-light text-center fs-5 && fw-normal'>
                         {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
                        ))} 
                    </tbody>
                </table>
                 <div><h1 className='badge bg-light text-wrap fs-4 && text-dark && fw-lighter'>Total Price::    {totalPrice}/-</h1></div>  
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut}> Check Out </button>
                </div>
            </div>



        </div>
    )
}