import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import OrdersChart from "./OrdersChart";
import {fetchOrdersData} from '../../Store/slice/ordersSlice'; 

const OrdersChartConatiner = () => {
    const dispatch = useDispatch();
    const { month, year } = useSelector((state) => state.userInput);
    const { data, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrdersData(month,year))
    },[month,year]);
    return (
       <OrdersChart data={data} />
    );
}

export default OrdersChartConatiner;