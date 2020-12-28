import GenericService from "./GenericService";

class ChapterService extends GenericService {
  constructor() {
    super();
  }

  getChapter = () => this.get("/api/chapters");
  getSingleChapter = (id) => this.get("/api/chapters/" + id);
  addChapter = (data) => this.post("/api/chapters", data);
  deleteChapter = (_id) => this.delete("/api/chapters/delete/" + _id);
  updateChapter = (_id, data) => this.put("/api/chapters/update/" + _id, data);
}

let chapterService = new ChapterService();
export default chapterService;
