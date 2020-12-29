import GenericService from "./GenericService";

class NovelService extends GenericService {
  constructor() {
    super();
  }

  getNovel = () => this.get("/api/novels");
  getSingleNovel = (id) => this.get("/api/novels/" + id);
  addNovel = (formData, config) =>
    this.postNovel("/api/novels", formData, config);
  deleteNovel = (_id) => this.delete("/api/novels/delete/" + _id);
  updateNovel = (_id, data) => this.put("/api/novels/update/" + _id, data);
}

let novelService = new NovelService();
export default novelService;
