export interface MissionState {
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  image?:
    | {
        name: string | undefined;
        src: string | undefined;
      }
    | undefined;
  id: string;
  launch_date_utc: string;
  launch_year: string;
  details: string | null;
  links: {
    article_link: string | null;
  };
}
