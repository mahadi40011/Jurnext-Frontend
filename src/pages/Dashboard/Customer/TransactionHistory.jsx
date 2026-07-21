import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import TransactionHistoryTableRow from '../../../components/Shared/TableRows/TransactionHistoryTableRow';

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: transactions = [],
    isLoading,
  } = useQuery({
    queryKey: "Transactions",
    queryFn: async () => {
      const { data } = await axiosSecure(`/transactions`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <div className="overflow-x-auto rounded-xl border border-gray-300">
        <table className="table-auto w-full bg-white">
          <thead>
            <tr className="bg-emerald-500 text-white uppercase text-xs leading-normal">
              <th className="py-4 px-6 text-left">Operator Name</th>
              <th className="py-4 px-6 text-center">Transaction ID</th>
              <th className="py-4 px-6 text-center">amount</th>
              <th className="py-4 px-6 text-center">date</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm font-light">
            {transactions.map((transaction) => (
              <TransactionHistoryTableRow key={transaction._id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;