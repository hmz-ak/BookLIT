import GenericService from "./GenericService";

class NovelService extends GenericService {
  constructor() {
    super();
  }

  getNovel = () => this.get("/api/novels");
  getSingleNovel = (id) => this.get("/api/novels/" + id);
  addNovel = (formData, config) =>
    this.postData("/api/novels", formData, config);
  deleteNovel = (_id) => this.delete("/api/novels/delete/" + _id);
  updateNovel = (_id, formData, config) =>
    this.putData("/api/novels/update/" + _id, formData, config);
}

let novelService = new NovelService();
export default novelService;
