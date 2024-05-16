import { Photo, type IPhoto } from "@/models/Photo.model";
import axios from "axios";

export default class PhlikerService{
    private API_NAME = "flickr.photos.search";
    private API_KEY = "";// put your API key here
    private API_URL = "https://www.flickr.com/services/rest/" + "?&method=" + this.API_NAME + "&api_key=" + this.API_KEY;
    private PHOTO_INFO_URL = "https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + this.API_KEY + "&photo_id=";
    
    public search(query:string, page:number): Promise<IPhoto[]> {
      return new Promise<IPhoto[]>((resolve, reject) => {
        axios
          .get(this.API_URL + "&tags=" + query + "&per_page=20&page="+page+"&format=json&nojsoncallback=1&safe_search=1")
          .then(res => {
            resolve(res.data.photos.photo);
          })
          .catch(err => {
            reject(err);
          });
      });
    }

    public getInfo(id:number):Promise<any>{
      return new Promise<IPhoto[]>((resolve, reject) => {
        axios
          .get(this.PHOTO_INFO_URL + id + "&format=json&nojsoncallback=1&safe_search=1")
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
};
