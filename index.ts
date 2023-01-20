import HetznerDnsClient from "./lib/HetznerDnsClient.js";
import Zone from "./lib/Zone.js";
import DnsRecord from "./lib/DnsRecord.js";
import PrimaryServer from "./lib/PrimaryServer.js";
import ApiResponse from "./lib/ApiResponse.js";
import Zones from "./lib/Zones.js";
import ClientObject from "./lib/ClientObject.js";
import BulkCreateRecordsPretty from "./lib/BulkCreateRecordsPretty.js";
import BulkUpdateRecordsPretty from "./lib/BulkUpdateRecordsPretty.js";
import ZoneValidationPretty from "./lib/ZoneValidationPretty.js";
import ApiError from "./lib/errors/ApiError.js";
import ClientParseError from "./lib/errors/ClientParseError.js";
import ErrorModel from "./lib/models/ErrorModel";
import ZoneModel from "./lib/models/ZoneModel";
import BulkCreateRecords from "./lib/models/BulkCreateRecords";
import BulkUpdateRecords from "./lib/models/BulkUpdateRecords";
import BaseRecordModel from "./lib/models/BaseRecordModel";
import RecordModel from "./lib/models/RecordModel";
import PrimaryServerModel from "./lib/models/PrimaryServerModel";
import PaginatedZones from "./lib/models/PaginatedZones";
import PaginatedData from "./lib/models/PaginatedData";
import ZoneValidation from "./lib/models/ZoneValidation";

export default HetznerDnsClient;
export {
    Zone,
    DnsRecord,
    PrimaryServer,
    ApiResponse,
    Zones,
    ClientObject,
    BulkCreateRecordsPretty,
    BulkUpdateRecordsPretty,
    ZoneValidationPretty,
    ApiError,
    ClientParseError,
    ErrorModel,
    ZoneModel,
    BulkCreateRecords,
    BulkUpdateRecords,
    BaseRecordModel,
    RecordModel,
    PrimaryServerModel,
    PaginatedZones,
    PaginatedData,
    ZoneValidation
};
