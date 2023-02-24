import axios from "axios";
import { mockController } from "MockController";
import { IArticle, IListResponse } from "types";

export default async function handler(req: any, res: any) {
  const response = await new Promise<IListResponse<IArticle>>((resolve) => {
    console.log("test requested params", req.query);
    const mockServerResponse = mockController.getContent(req.query);

    setTimeout(() => {
      resolve(mockServerResponse);
    }, 1500);
  });

  res.status(200).json(response);
}
