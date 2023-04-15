/**
 * This file exports a `Copyright` component that can be used to display copyright
 * information in a footer or other section of a web page.
 *
 * @remarks
 * This component renders a `Typography` component with the copyright information,
 * and a `Link` component that links to the `rights-stuff.com` website.
 *
 * @returns A React component that renders the copyright information with a link to the `rights-stuff.com` website.
 *
 * @example
 * ```
 * import { Copyright } from './Copyright';
 *
 * // Renders the copyright information in the footer of the page
 * <footer>
 *   <Copyright />
 * </footer>
 * ```
 *
 * @see {@link https://mui.com/components/typography | Typography}
 * @see {@link https://mui.com/components/link | Link}
 */
import React from "react";

import { Typography, Link } from "@mui/material";

export const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"© "}
      {new Date().getFullYear()}
      {" · "}
      <Link color="inherit" href="https://rights-stuff.com">
        Rights Stuff
      </Link>{" "}
      · The Business of Entertainment.
    </Typography>
  );
};
