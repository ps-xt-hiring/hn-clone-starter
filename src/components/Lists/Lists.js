/* eslint-disable */
import { memo } from 'react';

/**
 * A memoized Component to render List of any Component
 *
 * @export
 * @param {*} { arryOfListSource, children }
 * @returns
 */
export function Lists({ arryOfListSource, children }) {
  const listOfEl = (arryOfListSource || []).map((list, index, arr) => {
    return children(list, index, arr);
  });

  return listOfEl;
}

export default memo(Lists, (prevProps, nextProps) => {
  return prevProps.arryOfListSource === nextProps.arryOfListSource;
});
