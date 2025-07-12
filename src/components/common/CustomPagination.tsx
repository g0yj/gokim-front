import { Pagination, PaginationItem } from "@mui/material";
import React, { useEffect, useState } from "react";

interface CustomPaginationProps {
  page: number;
  totalPage: number;
  onChange: (page: number) => void; // 버튼 누를 때 변경되는 로직
  boundaryCount?: number;
  siblingCount?: number;
  color?: "primary" | "secondary" | "standard";
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  totalPage,
  onChange,
  boundaryCount = 1,
  siblingCount = 1,
  color = "standard",
}) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  return (
    <div className="text-[#161C24]">
      <Pagination
        count={totalPage}
        page={page}
        onChange={handleChange}
        shape="rounded"
        color={color}
        boundaryCount={boundaryCount}
        siblingCount={siblingCount}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#161C24",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#0F141B",
                },
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default CustomPagination;
