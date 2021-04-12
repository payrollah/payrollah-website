import { makeStyles, Typography, Tooltip } from "@material-ui/core";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { verifyAddress } from "./verify";
import React, { useEffect, useState } from "react";

interface Props {
  address: string;
  domain: string;
}

const useStyles = makeStyles((theme) => ({
  verifiedContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  greenIcon: {
    color: "green",
    marginRight: "8px",
  },
  redIcon: {
    color: "red",
    marginRight: "8px",
  },
}));

const VerificationTag: React.FunctionComponent<Props> = ({
  address,
  domain,
}: Props) => {
  const classes = useStyles();

  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    verifyAddress(domain, address).then((response) => setIsVerified(response));
  }, [address, domain]);

  return (
    <React.Fragment>
      <Tooltip
        title={
          isVerified
            ? "Your DNS has been verified"
            : "You have not configured your DNS, you can visit our docs -> verify for more info"
        }
        arrow
      >
        <div className={classes.verifiedContainer}>
          {isVerified ? (
            <CheckCircleOutlineRoundedIcon className={classes.greenIcon} />
          ) : (
            <CancelRoundedIcon className={classes.redIcon} />
          )}
          <Typography variant="h6">{domain}</Typography>
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export default VerificationTag;
