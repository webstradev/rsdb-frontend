import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useApi } from "util/useApi";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import styled from "@mui/styled-engine";
import { styled as styledComponent } from "@mui/material/styles";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import NewspaperIcon from "@mui/icons-material/Newspaper";
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

const StyledDivider = styledComponent(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const AvatarWrapper = styledComponent(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: "1.5rem",
  width: theme.spacing(10),
  height: theme.spacing(10),
  fontWeight: "bold",
}));

// Gets the first letter of the first three words to display as the abbreviation in the avatar
const getAvatarLetters = (name: string) => {
  const matches = name.match(/\b(\w)/g);
  if (!matches) return "";
  return matches.join("").substring(0, 3);
};

// This link turns http into https and ensures each link has https infront of it if it doesn't already
const safeLink = (url: string) => {
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  } else if (!url.startsWith("https://")) {
    return `https://${url}`;
  } else {
    return url;
  }
};

export const Platform: React.FC = () => {
  const { id } = useParams();
  const { data: platform, loading } = useApi("get", `/v1/platforms/${id}`);

  if (loading) return <CircularProgress />;

  if (!platform) return <Box>Platform not found</Box>;

  return (
    <PlatformWrapper>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <AvatarWrapper>{getAvatarLetters(platform.name)}</AvatarWrapper>
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
            <Button component={RouterLink} to={`/platforms/${id}/contacts`}>
              <PersonIcon fontSize="small" />
              <Typography variant="subtitle2" ml={1} mr={2}>
                {platform.contactsCount} Contacts
              </Typography>
            </Button>
            <Button component={RouterLink} to={`/platforms/${id}/articles`}>
              <NewspaperIcon fontSize="small" />
              <Typography variant="subtitle2" ml={1} mr={2}>
                {platform.articlesCount} Articles
              </Typography>
            </Button>
            <Button component={RouterLink} to={`/platforms/${id}/projects`}>
              <VideocamIcon fontSize="small" />
              <Typography variant="subtitle2" ml={1}>
                {platform.projectsCount} Projects
              </Typography>
            </Button>
          </Box>
          <Box mb={2}>
            {platform.categories.map((category: any) => (
              <Chip label={category.category} size="small" variant="outlined" />
            ))}
          </Box>

          <Typography gutterBottom>
            <Link component={RouterLink} to={safeLink(platform.website)}>
              {platform.website}
            </Link>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {platform.country}
          </Typography>
          <StyledDivider />
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 400 }}>
            Notes:
          </Typography>
          <Typography variant="body1">{platform.notes}</Typography>
        </Grid>
      </Grid>
    </PlatformWrapper>
  );
};
