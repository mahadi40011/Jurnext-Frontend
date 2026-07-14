import React, { useState } from "react";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import AllTicketPageCard from "../../components/Shared/Cards/AllTicketPageCard";
import Container from "../../components/Shared/Container";

const AllTicket = () => {


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
            value={search.from}
            onChange={(e) =>
              setSearch({
                ...search,
                from: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="To"
            className="input input-bordered w-full"
            value={search.to}
            onChange={(e) =>
              setSearch({
                ...search,
                to: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="input input-bordered w-full"
            value={search.date}
            onChange={(e) =>
              setSearch({
                ...search,
                date: e.target.value,
              })
            }
          />

          <button className="btn bg-lime-600 hover:bg-lime-700 text-white">
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
                value={filters.busType}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    busType: e.target.value,
                  })
                }
              >
                <option value="">All</option>
                <option value="AC">AC</option>
                <option value="Non AC">Non AC</option>
              </select>
            </div>

            {/* Operator */}
            <div>
              <label className="font-medium text-sm mb-2 block">Operator</label>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Hanif / Green Line"
                value={filters.operator}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    operator: e.target.value,
                  })
                }
              />
            </div>

            {/* Price */}
            <div>
              <label className="font-medium text-sm mb-2 block">
                Max Price
              </label>

              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="1000"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: e.target.value,
                  })
                }
              />
            </div>

            <button
              className="btn bg-lime-600 hover:bg-lime-700 text-white w-full"
              onClick={refetch}
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
              value={filters.busType}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  busType: e.target.value,
                })
              }
            >
              <option value="">All Bus</option>
              <option value="AC">AC</option>
              <option value="Non AC">Non AC</option>
            </select>

            {/* Operator */}
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Operator"
              value={filters.operator}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  operator: e.target.value,
                })
              }
            />

            {/* Price */}
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Maximum Price"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPrice: e.target.value,
                })
              }
            />

            <button
              className="btn rounded-lg text-white bg-lime-600 hover:bg-lime-700 w-full"
              onClick={() => {
                refetch();
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
