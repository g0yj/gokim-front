import { FileType } from "@/types/common/file";

type FileCardProps = {
    id:string;
    originalFileName:string;
    url:string;
    extension:string;
}

// React.FC<FileCardProps> 사용하는 곳과 아닌 곳의 차이
const FileCard: React.FC<FileCardProps> = ({ id, originalFileName, url, extension }) => {
  return (
    <div>
      {originalFileName}
    </div>
  );
};
export default FileCard;

/** React.FC<FileCardProps> 사용하는 곳과 아닌 곳의 차이
 
 // React.FC를 사용하는 경우
const FileCard: React.FC<FileCardProps> = ({ id, originalFileName, url, extension }) => {
  return (
    <div>
      {originalFileName} ({extension})
    </div>
  );
};

// React.FC를 사용하지 않는 경우
const FileCard = ({ id, originalFileName, url, extension }: FileCardProps) => {
  return (
    <div>
      {originalFileName} ({extension})
    </div>
  );
};

==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 장단점
### `React.FC`를 사용하는 경우

1. **기본적인 타입 지원**:
   - `React.FC`(또는 `React.FunctionComponent`)를 사용할 경우, 컴포넌트는 기본적으로 `children` prop을 포함합니다. 이 prop의 타입은 `ReactNode`입니다. 따라서 어떤 하위 요소가 들어와도 타입 안전성을 확보할 수 있습니다.

2. **타입 체킹**:
   - 컴포넌트에 전달되는 props에 대한 타입 체킹을 쉽게 설정할 수 있습니다.

3. **기본적인 타입 설정**:
   - `React.FC`는 기본적으로 함수형 컴포넌트에 대한 타입을 설정해 주므로 JSX를 반환하는 함수에 쉽게 적용할 수 있습니다.

### `React.FC`를 사용하지 않는 경우

1. **유연성**:
   - 모든 props를 명시적으로 지정해야 하기 때문에 `children`을 사용하지 않는 컴포넌트에서는 보다 명확하게 사용할 수 있습니다.
   - 컴포넌트가 `children`을 필요로 하지 않을 경우에는 `children`을 의도적으로 명시하지 않을 수 있습니다.

2. **더 명확한 코드**:
   - 기본 `React.FC`를 사용하지 않을 때는 함수의 반환 타입을 명시적으로 작성해야 합니다. 이를 통해 더 명확한 타입 설정이 가능합니다.

 */