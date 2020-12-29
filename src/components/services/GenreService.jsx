import GenericService from "./GenericService";

class GenreService extends GenericService {
  constructor() {
    super();
  }

  getGenre = () => this.get("/api/genre");
  getSingleGenre = (name) => this.get("/api/genre/" + name);
  addGenre = (data) => this.post("/api/genre", data);
  deleteGenre = (_id) => this.delete("/api/genre/delete/" + _id);
  updateGenre = (_id, data) => this.put("/api/genre/update/" + _id, data);
}

let genreService = new GenreService();
export default genreService;
