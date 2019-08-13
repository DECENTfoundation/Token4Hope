import * as Hapi from "hapi";

export class AuthHelper {

    public static async getUserToken(server: Hapi.Server, email: string, password: string) {
        const user = {
            email,
            password,
        };
        const r = await server.inject({
            headers: {
                Accept: "application/vnd.decent.ht.v1+json",
                ["Content-Type"]: "application/vnd.decent.ht.v1+json",
            },
            method: "POST",
            payload: user,
            url: "/user/signin",
        });
        const responseBody: any = JSON.parse(r.payload);
        return responseBody.token;
    }
}
