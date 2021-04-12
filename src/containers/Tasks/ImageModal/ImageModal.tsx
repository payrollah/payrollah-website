import { Dialog, DialogContent } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";

interface Props {
  jobAddr: string;
  taskId: number;
  open: boolean;
  onClose: () => void;
}

const ImageModal: React.FunctionComponent<Props> = ({
  open,
  onClose,
  jobAddr,
  taskId,
}: Props) => {
  const { jwtToken } = useContext(UserContext);
  const [img, setImg] = useState("");
  useEffect(() => {
    if (taskId === 0) return;
    axios({
      method: "get",
      url: `https://payrollah.herokuapp.com/work/getImage/${jobAddr}/${taskId}`,
      headers: {
        Authorization: "Bearer " + jwtToken,
        // responseType: "arraybuffer",
      },
    })
      .then(function (response) {
        setImg(response.data.urlLink);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [taskId, jobAddr, jwtToken]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      <DialogContent>
        <img
          src={img}
          alt="text"
          sizes="(max-width: 200px) 100vw, (max-width: 900px) 50vw, 800px"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
