import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FeaturedPost from "../../components/blog/FeaturedPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  closeModal,
  getBlogsAPI,
  openModal,
  selectIsOpenModal,
} from "../../redux/reducer/blog";
import EditBlogModal from "../../components/blog/EditBlogModal";
import { Button } from "@mui/material";

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const dispatch = useDispatch();
  // const posts = useSelector(selectBlogList);
  const isOpenModal = useSelector(selectIsOpenModal);

  useEffect(() => {
    dispatch(getBlogsAPI());
  }, [dispatch]);

  const onClickEdit = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Button variant="contained" onClick={onClickEdit}>
          Post
        </Button>
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost
              key={post.title}
              post={post}
              onClickEdit={onClickEdit}
            />
          ))}
        </Grid>
        <EditBlogModal open={isOpenModal} handleClose={handleClose} />
      </Container>
    </ThemeProvider>
  );
}
