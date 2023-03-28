import { useEffect } from 'react';

function useOutsideClick(ref: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        return true;
      }
      return false;
    }

    // Bind the event listener
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideClick;
