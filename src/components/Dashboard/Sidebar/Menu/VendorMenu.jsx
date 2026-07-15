import { LuTicketPlus } from "react-icons/lu";
import { ImUserCheck } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { FcStatistics } from "react-icons/fc";
import MenuItem from "../../../Shared/MenuItem";

const VendorMenu = () => {
  return (
    <>
      <MenuItem
        icon={FcStatistics}
        label="Revenue Overview"
        address="revenue-overview"
      />
      <MenuItem
        icon={LuTicketPlus}
        label="Add Ticket"
        address="/dashboard/add-ticket"
      />
      <MenuItem
        icon={ImUserCheck}
        label="My Added Ticket"
        address="added-ticket"
      />
      <MenuItem
        icon={TbBrandBooking}
        label="Requested Bookings"
        address="requested-bookings"
      />
    </>
  );
};

export default VendorMenu;
