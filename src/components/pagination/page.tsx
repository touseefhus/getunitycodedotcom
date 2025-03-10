import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number; // Current active page
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Callback function for page change
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {/* Previous Button */}
      <Button
        className="custom-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {/* Current Page Indicator */}
      <span>
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <Button
        className="custom-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;