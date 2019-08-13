export class RegexPattern {

    public static CurlBrackets = /\{|\}/g;
    public static ConfirmationLinkValues = /\{(.*?)\}/g;
    public static Accept = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
    public static Phone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    // tslint:disable-next-line:max-line-length
    public static Semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/;
}
