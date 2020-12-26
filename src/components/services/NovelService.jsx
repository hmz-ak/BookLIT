import GenericService from "./GenericService";

class NovelService extends GenericService {
  constructor() {
    super();
  }

  getNovel = () => this.get("/api/novels");
  getSingleNovel = (id) => this.get("/api/novels/" + id);
  addNovel = (data) => this.post("/api/novels", data);
  deleteNovel = (_id) => this.delete("/api/novels/delete/" + _id);
  updateNovel = (_id, data) => this.put("/api/novels/update/" + _id, data);
}

let novelService = new NovelService();
export default novelService;
