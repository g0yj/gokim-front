import log from '@/lib/logger';
import { CustomTableProps } from '@/types/common/common';

import React from 'react';


const CustomTable = <T,>({
    columns,
    data,
}: CustomTableProps<T>) => {
    log.debug('테이블 컴포넌트 출력');

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
                  {
                      data.map((row, idx) => (
                          <tr key={idx}>
                              {
                                  columns.map((col) => (
                                    <td
                                        key={String(col.key)}
                                        className="border p-2"
                                        style={{ width: col.width, textAlign: col.align || 'center' }} //  center 기본값 처리
                                        >
                                        {
                                            col.render
                                            ? col.render(row[col.key], row)                           //  render 함수가 있으면 사용
                                            : String(row[col.key] ?? '')                              //  안전하게 fallback 처리
                                        }
                                        </td>
                                  ))
                              }
                              
                          </tr>
                      ))
                  }
              </tbody>
        </table>
    </div>
  );
};

export default CustomTable;