"use client";

import ScPagination from "@/components/local/sh-pagination";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HoursTable from "./hours-table";
import StatusFilter, { Status } from "./status-filter";

export default function HoursOverview() {
  const [selectedStatus, setSelectedStatus] = useState<Status | "all">("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hours: any[];
    totalCount: number;
    totalPages: number;
  }>({
    queryKey: ["hours", selectedStatus, page],
    queryFn: async () =>
      fetch(
        `/api/admin/hours?status=${selectedStatus}&page=${page}&pageSize=5`
      ).then((res) => res.json()),
  });

  const handleStatusChange = (status: Status) => {
    setSelectedStatus(status);
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hours overview</h1>
      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
      {isError ? (
        <p>Something went wrong</p>
      ) : (
        <SkeletonWrapper isLoading={isLoading}>
          <HoursTable hours={data?.hours ?? []} />
          {data && data.totalCount > 0 && (
            <div className="mt-4">
              <ScPagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </SkeletonWrapper>
      )}
    </div>
  );
}
