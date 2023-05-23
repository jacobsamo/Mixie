import React, { useEffect, useState } from 'react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';

interface AddBatchProps {
  add: number;
  setAdd: React.Dispatch<React.SetStateAction<number>>;
}

const AddBatch = ({ add, setAdd }: AddBatchProps) => {
  const [batchTitle, setBatchTitle] = useState('Batch');

  useEffect(() => {
    add < 1 ? setAdd(1) : null;
    add > 1 ? setBatchTitle('Batches') : setBatchTitle('Batch');
  }, [add]);

  function addBatch() {
    setAdd(add + 1);
  }
  function minusBatch() {
    setAdd(add - 1);
  }

  return (
    <>
      <div className="flex flew-row items-center py-1">
        <button data-testid="plus_button" onClick={addBatch}>
          <PlusCircleIcon className="w-10 h-10 w-" />
        </button>
        <button data-testid="minus_button" onClick={minusBatch}>
          <MinusCircleIcon
            className={`w-10 h-10 ${
              add < 2 ? 'pointer-events-none bg-none opacity-20 text-white' : ''
            }`}
          />
        </button>
        <p data-testid="title">
          {add} {batchTitle}
        </p>
      </div>
    </>
  );
};

export default AddBatch;
