import { RefObject, useCallback, useEffect, useState } from 'react';

export const useTopNavDropdownMenu = (
  menuButtonRef: RefObject<HTMLDivElement>,
  dropdownRef: RefObject<HTMLDivElement>
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdownOpenState = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (
        menuButtonRef.current &&
        dropdownRef.current &&
        !menuButtonRef.current.contains(e.target as Node) &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        toggleDropdownOpenState();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuButtonRef, dropdownRef, toggleDropdownOpenState]);

  return { isDropdownOpen, toggleDropdownOpenState };
};
