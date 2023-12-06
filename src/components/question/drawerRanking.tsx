import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";

export default function DrawerRanking(props) {
  const { open, userList, handleClose } = props;
  const awardColor = ["gold", "silver", "bronze"];

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {userList.map((user, index) => (
            <ListItem key={user.id} disablePadding>
              {(index < 3 && (
                <MilitaryTechRoundedIcon style={{ color: awardColor[index] }} />
              )) || (
                <Typography sx={{ width: 24, textAlign: "center" }}>
                  {index + 1}
                </Typography>
              )}

              <ListItemText primary={user.name} />
              <Typography sx={{ marginLeft: "auto" }}>
                {user.highScore}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
