package com.ecom.accounting.Accounting.returns;

import com.ecom.accounting.entities.ReturnStatus;
import com.ecom.accounting.repositories.ReturnStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
public class ReturnsService {
    @Autowired
    private ReturnStatusRepository returnStatusRepository;

    Page<ReturnStatus> getReturns(Pageable page,String sellerId, int month, int year) {
        return returnStatusRepository.findBySellerIdAndMonthAndYearAndIsReceived(page,sellerId,month,year,false);
    }
}
