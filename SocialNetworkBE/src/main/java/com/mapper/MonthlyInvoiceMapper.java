package com.mapper;

import com.entity.roomManagement.MonthlyInvoice;
import com.response.MonthlyInvoiceResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MonthlyInvoiceMapper {

    @Mapping(source = "roomRentalDetail.motelRoom.name", target = "motelRoom_name") // Lấy tên phòng trọ
    @Mapping(source = "roomRentalDetail.motelRoom.id", target = "motelRoom_id") // Lấy ID phòng trọ
    @Mapping(source = "roomRentalDetail.tenant.userProfile.name", target = "tenant_name") // Lấy tên tenant
    @Mapping(source = "roomRentalDetail.id", target = "roomRentalDetail_id") // Lấy ID chi tiết thuê phòng
    MonthlyInvoiceResponse toMonthlyInvoiceDTO(MonthlyInvoice monthlyInvoice);

}
