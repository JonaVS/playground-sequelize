import { Result } from "../types/Result.js";
import { TagDTO } from "../dtos/tagDtos.js";
import * as tagService from "../db/services/tag/tagService.js";

export const getAll = async (): Promise<Result<TagDTO[]>> => {
  return await tagService.getAll();
};
