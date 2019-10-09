import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LayersContext, LensContext } from '../context';

import MapDraw from './MapDraw';

const LensMapDraw = props => {
  const { forwardedRef, controlOptions, PopupContent } = props;
  const { lens = {} } = useContext(LensContext) || {};
  const layers = useContext(LayersContext) || {};

  const { handlers: lensHandlers = {} } = lens;
  const { handleOnCreated } = lensHandlers;

  return (
    <MapDraw
      ref={forwardedRef}
      onCreated={handleOnCreated}
      controlOptions={controlOptions}
      PopupContent={PopupContent}
      {...layers}
      {...props}
    />
  );
};

LensMapDraw.propTypes = {
  forwardedRef: PropTypes.object,
  controlOptions: PropTypes.object,
  PopupContent: PropTypes.any
};

const LensMapDrawWithRefs = React.forwardRef(function lensMapDraw (props, ref) {
  return <LensMapDraw {...props} forwardedRef={ref} />;
});

LensMapDrawWithRefs.displayName = 'LensMapDrawWithRefs';

export default LensMapDrawWithRefs;
