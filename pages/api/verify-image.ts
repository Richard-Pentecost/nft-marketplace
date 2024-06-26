import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import {
  addressCheckMiddleware,
  pinataApiKey,
  pinataSecretApiKey,
  withSession,
} from "./utils";
import { FileReq } from "@/types/nft";
import FormData from "form-data";
import axios from "axios";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === "POST") {
      try {
        const { bytes, fileName, contentType } = req.body as FileReq;

        if (!bytes || !fileName || !contentType) {
          return res.status(422).send({ message: "Image data is missing" });
        }

        await addressCheckMiddleware(req, res);
        const buffer = Buffer.from(Object.values(bytes));

        const formData = new FormData();
        formData.append("file", buffer, {
          contentType,
          filename: fileName + "-" + uuidv4(),
        });

        const fileRes = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
            },
          }
        );

        return res.status(200).send(fileRes.data);
      } catch (e: any) {
        console.error(e.message);
        return res.status(422).send({ message: "Cannot create image" });
      }
    } else {
      return res.status(404).send({ message: "Invalid api endpoint" });
    }
  }
);
