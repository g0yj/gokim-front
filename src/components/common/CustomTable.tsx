import log from '@/lib/logger';
import { CustomTableProps } from '@/types/common/common';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const CustomTable = <T,>({
    columns,
    data,
    getDetailLink,
    getRowKey
}: CustomTableProps<T>) => {
    const navigate = useNavigate();

  return (
    <div>
          <table className='w-full border'>
              <thead>
                  <tr>
                      {
                          columns.map((col) => (
                              <th key={String(col.key)} className='boarder p-2'>{ col.label }</th>
                          ))
                      }
                  </tr>
              </thead>
              <tbody>
          {data.map((row,idx) => {
            const canNavigate = !!getDetailLink;
            return (
              <tr
                 key={getRowKey ? getRowKey(row, idx) : idx}
                onClick={() => {
                  if (canNavigate && getDetailLink) {
                    navigate(getDetailLink(row));
                  }
                }}
                className={canNavigate ? 'cursor-pointer hover:bg-gray-100 transition' : ''}
              >
                {columns.map((col) => {
                  const rawValue = row[col.key];
                  const cellContent = col.render
                    ? col.render(rawValue, row)
                    : String(rawValue ?? '');

                  return (
                    <td
                      key={String(col.key)}
                      className="border p-2"
                      style={{
                        width: col.width,
                        textAlign: col.align || 'center',
                      }}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        </table>
    </div>
  );
};

export default CustomTable;