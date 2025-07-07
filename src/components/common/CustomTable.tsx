import log from '@/lib/logger';
import { CustomTableProps } from '@/types/common/common';
import React from 'react';
import {  useNavigate } from 'react-router-dom';


const CustomTable = <T,>({
    columns,
    data,
    getDetailLink,
    getRowKey,
    propId
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
                    const detailLink = getDetailLink(row);
                    if (propId) {
                      log.warn('propId 조건으로 들어옴????')
                      // propId가 존재할 때 상태와 함께 navigate 수행
                      navigate(detailLink, { state:  propId});
                    } else {
                      // propId가 없을 때 정상 navigate 수행
                      navigate(detailLink);
                    }
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