import React, { useCallback, useState, useEffect } from 'react';
import styles from './Form.module.scss';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TextArea = (props: any) => {
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
      <textarea
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.textarea}
        name={props.name}
        placeholder={props.placeholder}
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
              <XMarkIcon className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </label>
  );
};

export { TextArea };
