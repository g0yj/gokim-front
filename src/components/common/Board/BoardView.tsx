import log from '@/lib/logger';
import BoardService from '@/services/boardService';
import { BoardFormData, BoardFormProps } from '@/types/common/board';
import { downloadFileFromUrl } from '@/utils/file';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BoardView = ({ id: propId, resourcePath }: BoardFormProps) => {
    const params = useParams();
    const id = propId ?? params.id;
  
    const [form, setForm] = useState<BoardFormData>({
      title: '',
      content: '',
      files: [],
    });
  

    useEffect(() => {
      if (id) {
        (async () => {
          try {
              const data = await BoardService.detail({ id, resourcePath });
              log.debug('데이터 확인 >> ', data);
            setForm(data);
          } catch (err) {
            log.error('상세 조회 실패', err);
          }
        })();
      }
    }, [id, resourcePath]);
  
    return (
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
        <h2>{form.title}</h2>
        <div
          style={{ marginTop: '1rem', lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: form.content }}
        />
        {form.files && form.files.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h4>첨부파일</h4>
            <ul>
            {form.files.map((file, idx) => (
                <li key={idx}>
                <button onClick={() => downloadFileFromUrl(file.url, file.originalFileName)} style={{ all: 'unset', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                    {file.originalFileName}
                </button>
                </li>
            ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default BoardView;