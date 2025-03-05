import React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"

const EmployeePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer hover:bg-blue-50 transition-colors p-2 rounded"
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => onPageChange(page)}
              className={
                currentPage === page
                  ? "bg-primary text-white px-3 py-1 rounded cursor-pointer"
                  : "hover:bg-gray-100 border hover:border-gray-600 transition-colors px-3 py-1 rounded cursor-pointer"
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer hover:bg-blue-50 transition-colors p-2 rounded"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default EmployeePagination