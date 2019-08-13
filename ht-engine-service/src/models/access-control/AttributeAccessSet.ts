import { Sealed } from "../../utils/foundation/class/decorators";
import { AttributeAccess } from "./AttributeAccess";
import { AttributeDateAccess } from "./AttributeDateAccess";

@Sealed
export class AttributeAccessSet {
    public static All = [
        AttributeAccess.Vendor,
        AttributeAccess.Customer,
        AttributeAccess.User,
        AttributeAccess.Public,
        AttributeAccess.Content,
        AttributeAccess.Kafka,
        AttributeAccess.Session,
        AttributeAccess.Event,
    ];

    public static Dates = [
        AttributeDateAccess.Created,
        AttributeDateAccess.Deleted,
        AttributeDateAccess.Updated,
    ];
}
