import {  BoardFormProps } from '@/types/common/board'; 'react-router-dom';
import BoardView from './BoardView';

const BoardForm = ( props: BoardFormProps ) => {
    const { mode } = props;

    switch (mode) {
        case 'view':
            return <BoardView {...props} />
        
        default:
            return null;
    } 

};

export default BoardForm;