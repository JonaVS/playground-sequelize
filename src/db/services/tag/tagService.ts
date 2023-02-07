import { TagDTO } from "../../../dtos/tagDtos.js";
import { Result } from "../../../types/Result.js";
import * as tagDal from "../../dal/tagDal.js";
import { toTagDto } from "./tagDtoMappers.js";

export const getAll = async (): Promise<Result<TagDTO[]>> => {
  const dbResult = await tagDal.getTags();
  const tagDtos = dbResult.data.map(toTagDto);

  return { success: dbResult.success, data: tagDtos };
};
