package com.ecom.accounting.Accounting.ordermanagement.mapper;

import com.ecom.accounting.Accounting.ordermanagement.Order;
import com.ecom.accounting.Accounting.ordermanagement.dto.OrderDto;

public class OrderMapper {

    public static OrderDto toDTO(Order orderEntity) {
        if (orderEntity == null) {
            return null;
        }
        OrderDto orderDto = new OrderDto();
        orderDto.setOrderId(orderEntity.getOrderId());
        orderDto.setOrderStatus(orderEntity.getOrderStatus());
        orderDto.setOrderDate(orderEntity.getOrderDate());
        orderDto.setAmount(orderEntity.getAmount());
        orderDto.setSku(orderEntity.getSku());
        orderDto.setQuantity(orderEntity.getQuantity());
        orderDto.setPlatform(orderEntity.getPlatform());
        return orderDto;
    }
}
