import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import OrdersChart from "./OrdersChart";
import {fetchOrdersData} from '../../Store/slice/ordersSlice'; 
import Loader from "../loader/Loader";
import ErrorScreen from "../error/ErrorScreen";

const OrdersChartConatiner = () => {
    const dispatch = useDispatch();
    const { month, year } = useSelector((state) => state.userInput);
    const { data, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrdersData())
    },[month,year]);
    return (
       <div>
        {loading? <Loader></Loader> : error ? <ErrorScreen message={"Some thing went wrong"} onRetry={null}/> : <OrdersChart data={data} />}
       </div>
    );
}

export default OrdersChartConatiner;