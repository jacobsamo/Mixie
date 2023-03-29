import React, { useCallback, useState, useEffect } from 'react';
import styles from './Form.module.scss';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TextArea = ({ ...props }) => {
  const [textareaValue, setTextareaValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === ',' || e.key === 'Enter') {
        e.preventDefault();
        setTags([...tags, textareaValue]);
        setTextareaValue('');
      }
    },
    [textareaValue, tags]
  );

  useEffect(() => {
    props.onTagsChange(props.name, tags);
  }, [tags]);

  return (
    <label className={styles.textarea_container}>
      {props.label}
      {props.notes ? (
        <p className="text-[0.78rem] font-thin italic">{props.notes}</p>
      ) : false}
      <textarea
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.textarea}
        {...props}
      />
      <div className={styles.textarea_tags}>
        {tags.map((tag, index) => (
          <span key={index}>
            {tag}
            <button
              onClick={() => {
                setTags(tags.filter((_, i) => i !== index));
              }}
              type="button"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </span>
        ))}
      </div>
    </label>
  );
};

export { TextArea };
