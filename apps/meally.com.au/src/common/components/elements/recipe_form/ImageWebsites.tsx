import React, { useState } from 'react';
import Link from 'next/link';
import { Dialog } from 'ui';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ImageWebsites = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <p className="text-[0.78rem] font-thin italic">
        For other good image websites click{' '}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-blue underline"
        >
          here
        </button>
      </p>
      <div style={{ zIndex: 9999 }}>
        <Dialog
          isOpen={open}
          setOpen={setOpen}
          closeOnEscape={true}
          closeOnOutsideClick={true}
        >
          <div className="flex flex-col gap-2 bg-dark_grey p-20 rounded-md justify-center items-center w-full h-full">
            <div className="flex flex-row justify-between items-center">
              <h1>Image Sources</h1>
              <button type="button" onClick={() => setOpen(!open)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <ul className="list-disc">
              <li>
                <Link
                  href={'https://unsplash.com'}
                  target="_blank"
                  className="text-blue underline"
                >
                  Unsplash
                </Link>
              </li>
              <li>
                <Link
                  href={'https://isorepublic.com/'}
                  target="_blank"
                  className="text-blue underline"
                >
                  Iso Republic
                </Link>
              </li>
              <li>
                <Link
                  href={'https://savee.it'}
                  target="_blank"
                  className="text-blue underline"
                >
                  Savee
                </Link>
              </li>
              <li>
                <Link
                  href={'https://pixabay.com/'}
                  target="_blank"
                  className="text-blue underline"
                >
                  Pixabay
                </Link>
              </li>
              <li>
                <Link
                  href={'https://pexels.com/'}
                  target="_blank"
                  className="text-blue underline"
                >
                  Pexels
                </Link>
              </li>
              <li>
                <Link
                  href={'https://www.pinterest.com.au/'}
                  target="_blank"
                  className="text-blue underline"
                >
                  Pinterest
                </Link>
              </li>
            </ul>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ImageWebsites;
