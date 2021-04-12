import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import BlockIcon from "@material-ui/icons/Block";
import DisableCompany from "./DisableCompany/DisableCompany";
import BusinessIcon from "@material-ui/icons/Business";
import UserContext from "../../contexts/UserContext";
import VerificationTag from "../Verify/VerificationTag";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  verificationTag: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "20px",
  },
}));

const CompanyProfile: React.FunctionComponent = () => {
  const classes = useStyles();

  const { name, address, companyId, domain } = useContext(UserContext);

  const [disableCompanyOpen, setDisableCompanyOpen] = useState(false);
  const [companyIdToDisable] = useState(Number(companyId));

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
        <Typography variant="h3" style={{ marginRight: "auto" }}>
          Company Profile
        </Typography>
        <div className={classes.verificationTag}>
          <VerificationTag address={address} domain={domain} />
        </div>

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
            <td className={classes.td}>{name}</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Company ID</td>
            <td className={classes.td}>{companyId}</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Domain</td>
            <td className={classes.td}>{domain}</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>Account Address</td>
            <td className={classes.td}>{address}</td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
};

export default CompanyProfile;
