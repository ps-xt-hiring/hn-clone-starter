import styled from 'styled-components';

export default (WrappedComponent, styles) => styled(WrappedComponent)`
  ${styles};
`;