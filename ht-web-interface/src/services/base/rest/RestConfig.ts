import { RestAuth } from "./RestAuth";

export interface RestConfig {
    path: string;
    authorized?: RestAuth;
    headers?: { [key: string]: string };
}
