import { faker } from "@faker-js/faker";
import { IArticle, IArticleParams, IListResponse } from "types";

const generateContents = ({ length = 100 }): IArticle[] => {
  const contents = Array.from({ length }).map((_, index: number) => {
    const contentId = (index + 1).toString().padStart(3, "0");

    return {
      id: `${contentId}__${faker.random.alpha(10)}`,
      title: `${contentId}__${faker.address.cardinalDirection()} ${faker.address.cityName()}`,
    };
  });

  return contents;
};

export const mockController = {
  mockContents: generateContents({ length: 100 }),
  getContent(params: IArticleParams): IListResponse<IArticle> {
    const filteredContents = this.mockContents.filter((item: IArticle) => {
      if (!params.filters) return true;

      return item.title.includes(params.filters);
    });

    const from = Number(params.offset);
    const to = Number(params.offset) + Number(params.limit);

    console.log('test from', from);
    console.log('test to', to);
    
    return {
      contents: filteredContents.slice(from, to),
      offset: to,
      limit: Number(params.limit),
      totalCount: this.mockContents.length,
    };
  },
};

mockController.mockContents;
