import PropTypes from "prop-types";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

SVGIcon.propTypes = {
  src: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function SVGIcon({ src, sx }) {
  return (
    <Box
      component="span"
      sx={{
        width: "10px",
        height: "10px",
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
}
