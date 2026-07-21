import dayjs from "dayjs";
import React from "react";

const TransactionHistoryTableRow = ({ transaction }) => {
  const { operator, transactionId, amount, date } = transaction;

  return (
    <tr className="border-b border-gray-200 hover:bg-emerald-50 transition-colors">
      <td className="py-4 px-6 text-left border-r border-gray-200 font-medium whitespace-nowrap">
        {operator}
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200">
        {transactionId}
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200 whitespace-nowrap font-semibold text-blue-600">
        {amount} TK
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200 font-bold">
        {dayjs(date).format("DD MMM YYYY, hh:mm A")}
      </td>
    </tr>
  );
};

export default TransactionHistoryTableRow;
