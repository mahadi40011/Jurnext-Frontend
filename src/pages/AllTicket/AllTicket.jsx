import React, { useState } from "react";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import AllTicketPageCard from "../../components/Shared/Cards/AllTicketPageCard";
import Container from "../../components/Shared/Container";

const AllTicket = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const defaultSearch = location.state || {
    from: "",
    to: "",
    date: "",
  };
  const defaultFilter = {
    operator: "",
    busType: "",
    maxPrice: "",
  };

  const [searchInput, setSearchInput] = useState(defaultSearch);
  const [search, setSearch] = useState(defaultSearch);

  const [filterInput, setFilterInput] = useState(defaultFilter);
  const [filters, setFilters] = useState(defaultFilter);

  console.log({ search, filters });
  
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approved-tickets", search, filters],

    queryFn: async () => {
      const res = await axiosSecure.get("/approved-tickets", {
        params: {
          from: search.from,
          to: search.to,
          date: search.date,
          operator: filters.operator,
          maxPrice: filters.maxPrice,
          busType: filters.busType,
        },
      });

      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchInput);
  };

  const handleApplyFilter = () => {
    setFilters(filterInput);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Search Bar */}

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-lg p-5 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="From"
            className="input input-bordered w-full"
            value={searchInput.from}
            onChange={(e) =>
              setSearchInput({
                ...searchInput,
                from: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="To"
            className="input input-bordered w-full"
            value={searchInput.to}
            onChange={(e) =>
              setSearchInput({
                ...searchInput,
                to: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="input input-bordered w-full"
            value={searchInput.date}
            onChange={(e) =>
              setSearchInput({
                ...searchInput,
                date: e.target.value,
              })
            }
          />

          <button className="btn rounded-lg bg-lime-600 hover:bg-lime-700 text-white">
            <FaSearch />
            Search
          </button>
        </div>
      </form>

      {/* Main Layout */}

      <div className="grid lg:grid-cols-12 gap-8 mb-5">
        {/* Desktop Filter */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 rounded-2xl bg-white shadow-lg border border-gray-100 p-5 space-y-5">
            <div className="flex items-center gap-2">
              <FaFilter className="text-emerald-600" />
              <h2 className="font-bold text-lg">Filters</h2>
            </div>

            {/* Bus Type */}
            <div>
              <label className="font-medium text-sm mb-2 block">Bus Type</label>

              <select
                className="select select-bordered w-full"
                value={filterInput.busType}
                onChange={(e) =>
                  setFilterInput({
                    ...filterInput,
                    busType: e.target.value,
                  })
                }
              >
                <option value="">All</option>
                <option value="AC">AC</option>
                <option value="Non AC">Non AC</option>
                <option value="Sleeper">Sleeper</option>
              </select>
            </div>

            {/* Operator */}
            <div>
              <label className="font-medium text-sm mb-2 block">Operator</label>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Select Operator"
                value={filterInput.operator}
                onChange={(e) =>
                  setFilterInput({
                    ...filterInput,
                    operator: e.target.value,
                  })
                }
              />
            </div>

            {/* Price */}
            <div>
              <label className="font-medium text-sm mb-2 block">
                Price Limit
              </label>

              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Max Price"
                value={filterInput.maxPrice}
                onChange={(e) =>
                  setFilterInput({
                    ...filterInput,
                    maxPrice: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={handleApplyFilter}
              className="btn rounded-lg bg-lime-600 hover:bg-lime-700 text-white w-full"
            >
              Apply Filter
            </button>
          </div>
        </aside>

        {/* Ticket Grid */}
        <section className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <AllTicketPageCard key={ticket._id} ticket={ticket} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <h2 className="text-2xl font-bold">No Ticket Found</h2>

                <p className="text-gray-500 mt-2">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Mobile Floating Filter Button */}
      <button
        onClick={() => setShowMobileFilter(true)}
        className="lg:hidden fixed bottom-6 btn bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl z-50 transition-all animate-bounce"
        // className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-orange-600 hover:scale-105 transition-all flex items-center gap-2 animate-bounce"
      >
        <FaFilter />
        Filter
      </button>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end lg:hidden">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl">Filters</h2>

              <button onClick={() => setShowMobileFilter(false)}>
                <FaTimes size={20} />
              </button>
            </div>

            {/* Bus Type */}
            <select
              className="select select-bordered w-full"
              value={filterInput.busType}
              onChange={(e) =>
                setFilterInput({
                  ...filterInput,
                  busType: e.target.value,
                })
              }
            >
              <option value="">All Bus</option>
              <option value="AC">AC</option>
              <option value="Non AC">Non AC</option>
              <option value="Sleeper">Sleeper</option>
            </select>

            {/* Operator */}
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Select Operator"
              value={filterInput.operator}
              onChange={(e) =>
                setFilterInput({
                  ...filterInput,
                  operator: e.target.value,
                })
              }
            />

            {/* Price */}
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Max Price"
              value={filterInput.maxPrice}
              onChange={(e) =>
                setFilterInput({
                  ...filterInput,
                  maxPrice: e.target.value,
                })
              }
            />

            <button
              className="btn rounded-lg text-white bg-lime-600 hover:bg-lime-700 w-full"
              onClick={() => {
                handleApplyFilter();
                setShowMobileFilter(false);
              }}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AllTicket;
