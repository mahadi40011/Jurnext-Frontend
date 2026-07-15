import { FaUsersGear } from "react-icons/fa6";
import MenuItem from "../../../Shared/MenuItem";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { MdAirplaneTicket } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUsersGear}
        label="Manage Users"
        address="manage-users"
      />
      <MenuItem
        icon={BsFillTicketPerforatedFill}
        label="Manage Ticket"
        address="manage-ticket"
      />
      <MenuItem
        icon={MdAirplaneTicket}
        label="Advertise Tickets"
        address="advertise-tickets"
      />
    </>
  );
};

export default AdminMenu;
