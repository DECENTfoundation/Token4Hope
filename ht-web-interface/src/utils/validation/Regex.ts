export class ValidationRegex {
    // tslint:disable-next-line:max-line-length
    public static readonly email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public static readonly youtubeAsset = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)[\w\=]*)?/;
    public static readonly password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    public static readonly BIC = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    public static readonly number = /\d+/;
    public static readonly text = /\w+/;
}
