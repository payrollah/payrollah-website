import { Grid, Typography } from "@material-ui/core";
import React from "react";

import watermarkPicture from "./watermark-example.png";

const VerifyDocumentation: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <Grid>
        <Grid item xs={12} spacing={3}>
          <Typography variant="h3" gutterBottom>
            Downs Sampling Work using Watermarks
          </Typography>
          <Typography variant="body1">
            Payrollah facilitates the the exchange of work and compensation.
            Since compensation is tied in through depositing ethers with the
            addition of each task within the smart contract, we will also need a
            method to tie work to a ERC721 Token for a given company to preview
            before approval of the work. Additionally, future employer viewing a
            worker{`'`}s past work should not be able to view and access final
            full piece of work. Hence, we need an intermediary form of work
            which would be down sampled and worthless for the job owner and
            future employer until a full version is obtained while still
            allowing job owners and future employers to view and verify a copy
            of the work before approving it or choosing the candidate.
          </Typography>
          <br />
          <Typography variant="body1">
            Payrollah achieves this through the use of watermarks. Watermarks is
            a compromise to help us to degrade the quality of work while still
            allowing viewers to verify the quality of the work itself. Since
            malicious workers could game the system by adding their own
            watermarks, it is hence important that users familiarize themselves
            with how the work will be down sampled. Below is an example of what
            the payrollah watermark looks like.
          </Typography>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Example Watermarks
          </Typography>
          <Typography variant="body1">
            The watermark will consist of 2 components:
          </Typography>
          <ul>
            <li>Hash of file for verification</li>
            <li>Copyright text and instructions to unlocking full image</li>
          </ul>
          <br />
          <img src={watermarkPicture} alt="watermark-example" />
        </Grid>
        <br />
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Considerations
          </Typography>
          <Typography variant="body1">
            How then will can users trust our system? Firstly, our code base is
            completely open sourced, hence you would be able to look into how we
            process the image and add the watermark. Secondly, don{`'`}t trust
            us, trust the hash. Every work uploaded to our site will be
            processed and hashed with a one way encryption (`keccak256`). This
            produces a hash which will be submitted as evidence to the task
            token. When viewing the image, you will be able to see the hash and
            calculate it upon receiving the final full work. If the work was
            modified in any way, the hash would also be subsequently modified
            and mismatch from the one onchain, hence making the evidence
            tamper-proof once submitted by the worker.
          </Typography>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Future Plans
          </Typography>
          <Typography variant="body1">
            Since work is currently held in our custody, we aim to continue to
            decentralize the system. This means that we eventually plan to
            change the backend server to be a out of the box template for
            companies to fork and deploy their own version. This enables us to
            make payrollah decentralized by allowing companies to host final
            work related to their jobs. This can be done using a private and
            public key encryption to encrypt the file which key will be hidden
            in a commit and reveal scheme when file is uploader by worker. Only
            when the task is approved and worker receives compensation will the
            key be released for the company to access the work.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default VerifyDocumentation;
