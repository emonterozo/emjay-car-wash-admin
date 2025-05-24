import { useState, useCallback } from 'react';
import { LayoutRectangle, View } from 'react-native';

const useMeasure = (externalRef: React.RefObject<View>) => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const measure = useCallback(() => {
    if (externalRef?.current) {
      externalRef.current.measure((fx, fy, width, height, px, py) => {
        setLayout({ x: px, y: py, width, height });
      });
    }
  }, [externalRef]);

  return { layout, measure };
};

export default useMeasure;
