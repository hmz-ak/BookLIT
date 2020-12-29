import GenericService from "./GenericService";

class LibraryService extends GenericService {
  constructor() {
    super();
  }

  getLibrary = () => this.get("/api/library");
  addLibrary = (data) => this.post("/api/library", data);
  deleteLibrary = (_id) => this.delete("/api/library/delete/" + _id);
}

let libraryService = new LibraryService();
export default libraryService;
