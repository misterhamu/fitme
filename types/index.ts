import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type JWTGoogleResponse = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
};

export type FormSubmit = {
  employeeId: string
}


export interface WorkoutResponse {
  message: string;
  data:    WorkoutData;
}

export interface WorkoutData {
  current:   null;
  incoming:  Completed[];
  completed: Completed[];
}

export interface Completed {
  detail:    Detail;
  name:      string;
  type:      number;
  isometric: boolean;
  superset:  boolean;
  images:    string[];
  link:      string;
}

export interface Detail {
  type:  number;
  name:  string;
  color: string;
  reps:  number;
  sets:  number;
  rest:  number;
}
