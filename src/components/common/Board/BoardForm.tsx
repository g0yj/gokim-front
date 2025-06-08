import log from '@/lib/logger';
import BoardService from '@/services/boardService';
import { BoardFormData, BoardFormProps } from '@/types/common/board';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BoardForm = ({
    mode,
    id: propId,
    resourcePath
} : BoardFormProps) => {
    const params = useParams();
    const id = propId ?? params.id;

    const [form, setForm] = useState<BoardFormData>({
        title: '',
        content: '',
        files: [],
    });

    useEffect(() => {
        if (mode === 'view' && id) {
            (async () => {
                try {
                    const data = await BoardService.detail({ id, resourcePath });
                    setForm(data);
                } catch (err) {
                    log.error('상세 조회 호출 실패', err);
                }
            })();
        }
    }, [mode, id, resourcePath]);

  return (
    <div>
        <h3>상세조회</h3>
          <h4>{ form.title}</h4>
          <h4>{ form.id}</h4>
          <h4>{ form.content}</h4>
    </div>
  );
};

export default BoardForm;