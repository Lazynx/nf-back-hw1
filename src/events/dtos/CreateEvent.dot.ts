export interface CreateEventDto {
    name:string;
    description:string;
    date:Date;
    location:string;
    duration:string;
    rating?: number;
  }
  