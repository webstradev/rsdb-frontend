import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useApi } from "util/useApi";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import styled from "@mui/styled-engine";
import { styled as styledComponent } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WorkIcon from "@mui/icons-material/Work";
import VideocamIcon from "@mui/icons-material/Videocam";

const PlatformWrapper = styled(Box)`
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  margin: 20px;
  padding: 20px;
`;

const StyledButton = styledComponent(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const AvatarWrapper = styledComponent(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  height: 64,
  width: 64,
  fontSize: 32,
}));

export const Platform: React.FC = () => {
  const { id } = useParams();
  const { data: platform, loading } = useApi("get", `/v1/platforms/${id}`);

  return (
    <>
      {!loading && platform && (
        <PlatformWrapper>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <AvatarWrapper>{platform.name[0]}</AvatarWrapper>
            </Grid>
            <Grid item xs={10}>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" gutterBottom color="secondary">
                  {platform.name}
                </Typography>
                <Box marginLeft="auto">
                  <StyledButton
                    variant="contained"
                    startIcon={<EditIcon />}
                    size="small"
                  >
                    Edit
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    size="small"
                    color="error"
                  >
                    Delete
                  </StyledButton>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Button component={RouterLink} to={"#"}>
                  <PersonIcon fontSize="small" />
                  <Typography variant="subtitle2" ml={1} mr={2}>
                    {platform.contactsCount} Contacts
                  </Typography>
                </Button>
                <Button component={RouterLink} to={"#"}>
                  <NewspaperIcon fontSize="small" />
                  <Typography variant="subtitle2" ml={1} mr={2}>
                    {platform.articlesCount} Articles
                  </Typography>
                </Button>
                <Button component={RouterLink} to={"#"}>
                  <WorkIcon fontSize="small" />
                  <Typography variant="subtitle2" ml={1}>
                    {platform.platformsCount} Platforms
                  </Typography>
                </Button>
                <Button component={RouterLink} to={"#"}>
                  <VideocamIcon fontSize="small" />
                  <Typography variant="subtitle2" ml={1}>
                    {platform.projectsCount} Projects
                  </Typography>
                </Button>
              </Box>
              <Typography variant="subtitle1">{platform.website}</Typography>
              <Typography variant="subtitle1">{platform.country}</Typography>
              <Typography variant="subtitle1">{platform.notes}</Typography>
            </Grid>
          </Grid>
        </PlatformWrapper>
      )}
    </>
  );
};
