import React from "react";
import PropTypes from "prop-types";
import { Box, SxProps } from "@mui/system";

interface SVGIconProps {
  src: string;
  sx?: SxProps;
}

const SVGIcon: React.FC<SVGIconProps> = ({ src, sx }) => {
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
};

export default SVGIcon;
