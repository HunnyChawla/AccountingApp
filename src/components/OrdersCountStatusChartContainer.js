import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountByOrderStatus } from '../Store/slice/orderCountSlice';
import OrdersCountByStatusChart from "./OrdersCountByStatusChart";
   

const OrderCountStatusChartContainer = () => {
    const dispatch = useDispatch();
    const { month, year } = useSelector((state) => state.userInput);
    const { data, loading, error  } = useSelector((state) =>{
      console.log(state);
      return state.orderCount;
    } );
    useEffect(()=> {
        dispatch(fetchCountByOrderStatus());
        console.log("Hello");
    },[month,year]);
    return(
        <div>
            {!loading && (<OrdersCountByStatusChart data={data} />)}
        </div>
    );
}
export default OrderCountStatusChartContainer;