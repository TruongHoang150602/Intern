import SVGIcon from "@/components/SVGIcon";
import {
  getAllTestAPI,
  selectError,
  selectIsLoading,
  selectTestList,
} from "@/redux/slices/test";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page(props) {
  const dispatch = useDispatch();
  const testList = useSelector(selectTestList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAllTestAPI());
  }, [dispatch]);

  return (
    <Container className="main" maxWidth="lg">
      <Grid container spacing={3}>
        {testList.map((test) => (
          <Grid item xs={3} key={test._id}>
            <Link href={`/education/` + test._id}>
              <Box className="test">
                <SVGIcon
                  src="/topic/physical-science.svg"
                  sx={{
                    width: "40px",
                    height: "40px",
                    color: "#ffffff",
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    display: "inline-block",
                  }}
                >
                  {test.name}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
