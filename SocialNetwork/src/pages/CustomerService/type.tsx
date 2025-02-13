

export interface Amenity{
    id?:number,
    name:string,
    cost:number,
    per_capita:boolean,
}

export interface MotelRoom{
    id?:number,

    name:string,

    type_room:string,

    price_per_month:number,

    deposit:number,

    inhabited:boolean,

    availability_status:string,

    electricity_rate:number,

    address:string,

    water_rate:number,

    area:number,

    max_guests:number,

    bed_quantity:number,

    description:string,

    amenities:number[],

    image_url?:string,

    floor:number,

    updated_at?:string,

    created_at?:string,

    owner?:string;


}
export interface RoomListProps {
    rooms: MotelRoom[]; // Danh sách phòng
    onReload: () => void; // Hàm để reload danh sách phòng
}
export interface MotelRoomOperation {
    record:MotelRoom,
    onReload: () => void; // Hàm callback để tải lại dữ liệu
}












export interface CreateRoomRentalDetailRequest{
    expire:boolean,
    person_quantity:number,
    create_time:string,
    rental_start_time:string,
    tenant_email:string,
    motelRoomId:number,
    note:string,
}
export interface RoomentalDetailListProps {
    roomRentalDetailList: RoomRentalDetailResponse[]; // Danh sách phòng
    onReload: () => void; // Hàm để reload danh sách phòng
}
export interface RoomentalDetailOperation {
    record:RoomRentalDetailResponse,
    onReload: () => void; // Hàm callback để tải lại dữ liệu
}
export interface RoomRentalDetailResponse{
    id:number,
    expire:boolean,
    person_quantity:number,
    create_time:string,
    rental_start_time:string,
    tenant_email:string,
    motelRoom_id:number,
    motelRoom_name:string,
    note:string,
}








export interface CreatMonthlyInvoiceRequest{
    paid: boolean ;
    person_quantity:number;
    new_electric_number: number;
    last_electric_number:number;
    new_water_number:number;
    last_water_number:number;
    create_time:string;
    payment_month:string
    surcharge:number;
    note:string
    roomRentalDetail_id:number;
}
export interface MonthlyInvoiceReSponse{
    id:number,
    paid: boolean ;
    person_quantity:number;
    new_electric_number: number;
    last_electric_number:number;
    new_water_number:number;
    last_water_number:number;
    create_time:string;
    payment_month:string
    surcharge:number;
    note:string
    roomRentalDetail_id:number;
    motelRoom_name:string,
    motelRoom_id:number,
    tenant_name:string,
}

export interface MonthlyInvoiceOperation {
    record:MonthlyInvoiceReSponse,
    onReload: () => void; // Hàm callback để tải lại dữ liệu
}

export interface MonthlyInvoiceListProps {
    monthlyInvoiceList: MonthlyInvoiceReSponse[]; // Danh sách phòng
    onReload: () => void; // Hàm để reload danh sách phòng
}