import Genre from "./genres";

export interface Book {
    _id: number;
    title: string;
    author: string;
    publishedYear: number;
    pages: number;
    genre: Genre[];
    rating: number;
    status: "planned" | "reading" | "completed";
    isFavorite: boolean;
}
interface ebook extends Book{
    play:()=>void;
}

type book=ebook|Book;

class Book1 {
    constructor(public title:string,public author:string,public publishedYear:number,public pages:number,public genre:Genre[],public rating:number,public status:string,public isFavorite:boolean){}
    play():void{
        console.log(`Playing ${this.title}`);
    }
}

const book1=new Book1("The Great Gatsby","F. Scott Fitzgerald",1925,180,[Genre.Fiction],9.5,"reading",true);
book1.play();
book1.author

}