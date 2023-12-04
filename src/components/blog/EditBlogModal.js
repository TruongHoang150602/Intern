import { Modal, Grid, Card, Stack, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { RHFTextField, FormProvider } from "../react-hook-form/index";
import React from "react";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function EditBlogModal(props) {
  const { open, handleClose, post } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const titleRef = React.createRef();
  const discriptionRef = React.createRef();
  const imageRef = React.createRef();

  let defaultValue = {
    title: "",
    description: "",
    image: "",
  };

  if (post) defaultValue = post;

  const onSubmit = (data) => {
    console.log(data);
    console.log(titleRef.current.value);
    console.log(discriptionRef.current.value);
    console.log(imageRef.current.value);
  };

  return (
    <Modal
      open={open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormProvider control={control} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Card container sx={{ p: 3, minWidth: "400px" }}>
            <Stack spacing={3}>
              <RHFTextField
                name="title"
                label="Post Title"
                control={control}
                fullWidth
                required
                ref={titleRef}
                defaultValue={defaultValue.title}
              />
              <RHFTextField
                name="description"
                label="Description"
                multiline
                rows={3}
                control={control}
                fullWidth
                ref={discriptionRef}
                defaultValue={defaultValue.description}
              />

              <RHFTextField
                name="image"
                label="Image"
                control={control}
                fullWidth
                ref={imageRef}
                defaultValue={defaultValue.image}
              />

              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Post
              </Button>
            </Stack>
          </Card>
        </Grid>
      </FormProvider>
    </Modal>
  );
}
