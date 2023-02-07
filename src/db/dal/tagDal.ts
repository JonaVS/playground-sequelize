import Tag from "../../models/Tag.js";
import { Result } from "../../types/Result.js";

export const getTags = async (): Promise<Result<Tag[]>> => {
  let tags: Tag[] = [];
  let success = true;

  try {
    tags = await Tag.findAll();
  } catch (error) {
    console.log("An error ocurred while fetching the Tag entities");
  }

  return { success, data: tags };
};
