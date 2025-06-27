
import CustomPagination from '../common/CustomPagination';
import log from '@/lib/logger';
import BasicBoardSearchBox from './BasicBoardSearchBox';

import CustomTable from '../common/CustomTable';
import { BasicBoardProps } from '@/types/common/board';


/**
 * limit, search,
 * @returns 
 */
const BasicBoard = <Res,>({
    columns,
    data,
    paramQuery,
    onSearch,
    limitOptions,
    searchOptions,
    onPageChange,
    getDetailLink,
    createLink,
}: BasicBoardProps<Res>) => {
    
  
    return (
      <div className="space-y-6 ">
       
        <div className="flex justify-between items-end w-full mb-4">
        <BasicBoardSearchBox
            paramQuery={paramQuery}
            limits={limitOptions}
            searches={searchOptions}
            onSearch={onSearch}
            createLink={createLink}
          />
        </div>

        <div>
          <CustomTable columns={columns} data={data.content} getDetailLink={getDetailLink}  />
        </div>

        <div className="w-fit mx-auto mb-4">
         <CustomPagination
            page={data.page}
            totalPage={data.totalPage}
            onChange={onPageChange}
          />
        </div>

      </div>
    );
  };
  
  export default BasicBoard;

/**
 * Req와 Res란???
 * -> TypeScript의 제네릭(Generic) 문법에서 사용하는 사용자 정의 타입 변수
 * -> Req : react-hook-form의 form 필드 구조를 정의할 때 사용
 * -> Res : Api 호출 결과의 타입을 정의할 때 사용
 */