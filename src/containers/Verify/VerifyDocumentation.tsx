import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  tableClass: {
    width: "100%",
    border: "1px solid black",
  },
  borderClass: {
    border: "1px solid black",
  },
}));

const VerifyDocumentation: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid>
        <Grid item xs={12} spacing={3}>
          <Typography variant="h3" gutterBottom>
            Configuring DNS with Domain
          </Typography>
          <Typography variant="body1">
            Every company{`'`}s profile should contain a corresponding domain
            name. During the verification phase, the claim that a company is who
            they say they are can be checked against an external record in this
            case a domain name.
          </Typography>
          <br />
          <Typography variant="body1">
            This guide will show you how to set up a valid DNS text record for
            verification. A emblem will be displayed for verified companies to
            denote which jobs are posted by verified companies.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Prerequisites
          </Typography>
          <ul>
            <li>Domain Name</li>
            <li>Edit access to your domain{`'`}s DNS records</li>
            <li>Registered with payrollah</li>
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Inserting the DNS Record
          </Typography>
          <Typography variant="body1">
            You will need to add the DNS `TXT` records to your domain name. Here
            is some links to guides on adding DNS `TXT` record for some commons
            domain registrars and DNS providers.
          </Typography>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/dns-txt-records.html"
                rel="noreferrer"
              >
                Amazon Route 53
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare"
                rel="noreferrer"
              >
                Cloudflare
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.name.com/support/articles/115004972547-Adding-a-TXT-Record"
                rel="noreferrer"
              >
                Name.com
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain"
                rel="noreferrer"
              >
                Namecheap
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://sg.godaddy.com/help/add-a-txt-record-19232"
                rel="noreferrer"
              >
                GoDaddy
              </a>
            </li>
          </ul>
          <Typography variant="body1">
            Select the domain name that you want to associate your company with.
            Then insert a `TXT` record into the DNS in the following format:
          </Typography>
          <table className={classes.tableClass}>
            <tr>
              <th className={classes.borderClass}>Type</th>
              <th className={classes.borderClass}>Name</th>
              <th className={classes.borderClass}>Value</th>
            </tr>
            <tr>
              <td className={classes.borderClass}>TXT</td>
              <td className={classes.borderClass}>{`<your-domain.com>`}</td>
              <td
                className={classes.borderClass}
              >{`"payrollah net=ethereum netId=3 addr=<Your-Address>"`}</td>
            </tr>
          </table>
          <Typography variant="body1">
            The `netId` corresponds to the ethereum network that you are on. We
            generally use 1 for mainnet, 3 for ropsten and 4 for rinkeby.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Inserting the DNS Record
          </Typography>
          <Typography variant="body1">
            After adding the `TXT` record, we recommend you to check that the
            record has been inserted correctly by viewing with{" "}
            <a target="_blank" href="https://dns.google.com/" rel="noreferrer">
              Google DNS
            </a>
            . Make sure to select TXT in the RR Type dropdown.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default VerifyDocumentation;
