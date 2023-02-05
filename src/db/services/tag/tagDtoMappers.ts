import Tag from "../../../models/Tag.js";
import { TagDTO } from "../../../dtos/tagDtos.js";

export const toTagDto = (tag: Tag): TagDTO => {
  const responseDTO: TagDTO = {
    id: tag.id,
    name: tag.name,
  };
  return responseDTO;
};