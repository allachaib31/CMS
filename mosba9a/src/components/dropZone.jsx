import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, answer }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'RESPONSE',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [onDrop]);

    return (
        <div ref={drop} style={{ padding: '8px', border: '1px solid gray', minHeight: '50px', backgroundColor: isOver ? 'lightgreen' : 'black', marginBottom: '4px' }}>
            {answer || 'اسحب هنا'}
        </div>
    );
};

export default DropZone;
