import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import BlockIcon from "@material-ui/icons/Block";
import DisableCompany from "./DisableCompany/DisableCompany";
import BusinessIcon from "@material-ui/icons/Business";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  tr: {
    padding: "20px",
  },
  td: {
    padding: "20px",
    borderBottom: "1px solid grey",
  },
}));

const CompanyProfile: React.FunctionComponent = () => {
  const classes = useStyles();

  const companyAddr = "0xfC16D162C6a9Ff85346cB42176428c26278F09D1";
  const companyId = 666;

  const [disableCompanyOpen, setDisableCompanyOpen] = useState(false);
  const [companyIdToDisable] = useState(companyId);

  return (
    <React.Fragment>
      <DisableCompany
        open={disableCompanyOpen}
        onClose={() => setDisableCompanyOpen(false)}
        companyId={companyIdToDisable}
      />
      <Container
        disableGutters
        maxWidth={false}
        className={classes.buttonContainer}
      >
        <BusinessIcon style={{ height: 53, width: 53, paddingRight: "10px" }} />
        <Typography variant="h3" gutterBottom style={{ width: "100%" }}>
          Company Profile
        </Typography>
        <Button
          style={{ height: 40, width: 250 }}
          variant="contained"
          color="primary"
          startIcon={<BlockIcon />}
          onClick={() => setDisableCompanyOpen(true)}
        >
          Disable Account
        </Button>
      </Container>
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tr className={classes.tr}>
            <td className={classes.td}>Name</td>
            <td className={classes.td}>ABC Company Pte Ltd</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Company ID</td>
            <td className={classes.td}>{companyId}</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Domain</td>
            <td className={classes.td}>.......</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Account Address</td>
            <td className={classes.td}>{companyAddr}</td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
};

export default CompanyProfile;
