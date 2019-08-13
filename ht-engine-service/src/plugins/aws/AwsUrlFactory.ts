
export class AwsUrlFactory {

    public static buildUrl(location: string, options: { [key: string]: any }): string {
        const url = `${options.url}/${location}`;
        return url;
    }
}
