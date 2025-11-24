"use client"
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange = () => {},
  maxVisible = 5
}:any) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4" >
      {/* دکمه: اولین صفحه */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 
        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-blue-400"
        aria-label="اولین صفحه"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
        
      </button>

      {/* دکمه: صفحه قبل */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 
        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-blue-400"
        aria-label="صفحه قبل"
      >
        <ChevronsRight className="w-5 h-5 text-gray-600" />
      
      </button>

      {/* دکمه‌های شماره صفحات */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-10 h-10 text-gray-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all duration-200
                ${currentPage === page
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:border-blue-400'
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* دکمه: صفحه بعد */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 
        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-blue-400"
        aria-label="صفحه بعد"
      >
        <ChevronsLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* دکمه: آخرین صفحه */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 
        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-blue-400"
        aria-label="آخرین صفحه"
      >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};
