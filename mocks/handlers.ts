import { rest } from "msw";
import { mockController } from "../MockController";

export const handlers = [
  rest.get("http://localhost:3000/api/articles", (req, res, ctx) => {
    console.log("test msw req", req.params);
    const response = mockController.getContent(req.params as any);
    return res(ctx.json(response));
  }),
];
