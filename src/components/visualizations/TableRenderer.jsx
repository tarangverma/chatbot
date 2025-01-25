import React, { useState } from 'react';
import {
  Card,
  Typography,
  Button
} from "@material-tailwind/react";

export function TableRenderer({ data }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  if (!data || !data.length) return null;

  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {Object.keys(data[0]).map((header) => (
              <th key={header} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  {header}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex} className="py-3 px-5">
                  <Typography className="text-sm font-normal text-blue-gray-800">
                    {cell}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > rowsPerPage && (
        <div className="flex justify-center mt-4">
          <Button
            variant="text"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="text"
            size="sm"
            disabled={page * rowsPerPage >= data.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
