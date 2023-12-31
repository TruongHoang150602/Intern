import SVGIcon from "components/SVGIcon";
import {
  getAllTestAPI,
  selectError,
  selectIsLoading,
  selectTestList,
} from "redux/reducer/test";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITest } from "types/test";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export default function Page(props: any) {
  const dispatch = useDispatch();
  const testList = useSelector(selectTestList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    (dispatch as ThunkDispatch<any, void, AnyAction>)(getAllTestAPI())
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
