import React from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ id, text }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'RESPONSE',
        item: { id, text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, text]);

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, padding: '8px', border: '1px solid gray', marginBottom: '4px', backgroundColor: 'black', cursor: 'move' }}>
            {text}
        </div>
    );
};

export default DragItem;
